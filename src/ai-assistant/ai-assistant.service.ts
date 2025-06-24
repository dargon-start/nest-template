import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import OpenAI from 'openai';

import { Conversation } from './conversation.entity';
import { ChatCompletionMessageParam } from 'openai/resources/index';

@Injectable()
export class AiAssistantService {
  constructor(
    @InjectRepository(Conversation)
    private conversationRepository: Repository<Conversation>,
  ) {}

  async askQuestion(
    userId: string,
    question: ChatCompletionMessageParam[],
  ): Promise<string> {
    const openai = new OpenAI({
      // 若没有配置环境变量，请用百炼API Key将下行替换为：apiKey: "sk-xxx",
      apiKey: 'sk-fde9b160bdc348e3a648c853fb589033',
      baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
    });

    const completion = await openai.chat.completions.create({
      model: 'qwen-plus-2025-04-28', //此处以qwen-plus为例，可按需更换模型名称。模型列表：https://help.aliyun.com/zh/model-studio/getting-started/models
      // messages: [
      //   { role: 'system', content: 'You are a helpful assistant.' },
      //   { role: 'user', content: '你是谁？' },
      // ],
      messages: question,
      stream: true,
      stream_options: {
        include_usage: true,
      },
    });

    let fullContent = '';
    console.log('流式输出内容为：');
    for await (const chunk of completion) {
      // 如果stream_options.include_usage为true，则最后一个chunk的choices字段为空数组，需要跳过（可以通过chunk.usage获取 Token 使用量）
      if (Array.isArray(chunk.choices) && chunk.choices.length > 0) {
        fullContent = fullContent + chunk.choices[0].delta.content;
        console.log(chunk.choices[0].delta.content);
      }
    }

    // const answer = `这是对"${fullContent}"的回答`;

    // // 保存对话记录
    // const conversation = this.conversationRepository.create({
    //   userId,
    //   message: JSON.stringify(question), // 将数组转换为字符串
    //   response: answer,
    // });
    // await this.conversationRepository.save(conversation);

    return fullContent;
  }

  async getConversationHistory(userId: string): Promise<Conversation[]> {
    return this.conversationRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
      take: 10, // 获取最近的10条对话记录
    });
  }
}
