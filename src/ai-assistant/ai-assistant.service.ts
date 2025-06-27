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

  askQuestion(
    userId: string,
    question: ChatCompletionMessageParam[],
  ): ReadableStream<string> {
    const openai = new OpenAI({
      // 若没有配置环境变量，请用百炼API Key将下行替换为：apiKey: "sk-xxx",
      apiKey: 'sk-fde9b160bdc348e3a648c853fb589033',
      baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
    });

    const stream = new ReadableStream<string>({
      // 当有消费者开始读取流时，start 会被自动调用
      async start(controller) {
        const completion = await openai.chat.completions.create({
          model: 'qwen-plus-2025-04-28',
          messages: question,
          stream: true,
          stream_options: {
            include_usage: true,
          },
        });

        for await (const chunk of completion) {
          if (Array.isArray(chunk.choices) && chunk.choices.length > 0) {
            // const content = chunk.choices[0].delta.content;
            // if (content !== null && content !== undefined) {
            //   // 将每次生成的内容片段推送到流中，供调用方实时消费
            // }
            controller.enqueue(JSON.stringify(chunk));
          }
        }
        controller.close();
      },
    });

    console.log('question', stream);

    return stream;
  }

  async getConversationHistory(userId: string): Promise<Conversation[]> {
    return this.conversationRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
      take: 10, // 获取最近的10条对话记录
    });
  }
}
