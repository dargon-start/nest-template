import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { v4 as uuidv4 } from 'uuid';
import { ChatOpenAI } from '@langchain/openai';

@Injectable()
export class AiAssistantService {
  private prisma = new PrismaClient();

  constructor() {
    if (!process.env.QWEN_API_KEY) {
      throw new Error('QWEN_API_KEY 未在环境变量中配置');
    }
  }

  async createMessage(_dto: unknown) {
    const dto = _dto as CreateConversationDto;
    const sessionId = dto.sessionId || (uuidv4 as () => string)();
    // 保存用户消息
    await this.prisma.conversation.create({
      data: {
        sessionId,
        role: 'user',
        content:
          dto &&
          typeof dto === 'object' &&
          'message' in dto &&
          typeof dto.message === 'string'
            ? dto.message
            : '',
      },
    });

    // 使用langchain调用qwen-plus-2025-04-28大模型
    const llm = new ChatOpenAI({
      openAIApiKey: process.env.QWEN_API_KEY, // 请在环境变量中配置QWEN_API_KEY
      modelName: 'qwen-plus-2025-04-28',
      temperature: 0.7,
    });
    const aiReply = await llm.call([{ role: 'user', content: dto.message }]);

    // 确保aiReply.content是字符串类型
    const aiContent =
      typeof aiReply.content === 'string'
        ? aiReply.content
        : JSON.stringify(aiReply.content);

    await this.prisma.conversation.create({
      data: {
        sessionId,
        role: 'assistant',
        content: aiContent,
      },
    });
    // 查询历史
    const history = await this.prisma.conversation.findMany({
      where: { sessionId },
      orderBy: { timestamp: 'asc' },
    });
    return {
      sessionId,
      reply: aiContent,
      history,
    };
  }

  async getHistory(sessionId: string) {
    const history = await this.prisma.conversation.findMany({
      where: { sessionId },
      orderBy: { timestamp: 'asc' },
    });
    return {
      sessionId,
      history,
    };
  }
}
