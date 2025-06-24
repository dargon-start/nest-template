import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AiAssistantService } from './ai-assistant.service';
import { ChatCompletionMessageParam } from 'openai/resources/index';

@Controller('ai-assistant')
export class AiAssistantController {
  constructor(private readonly aiAssistantService: AiAssistantService) {}

  @Post('ask')
  async askQuestion(
    @Body('userId') userId: string,
    @Body('question') question: ChatCompletionMessageParam[],
  ): Promise<string> {
    return this.aiAssistantService.askQuestion(userId, question);
  }

  @Get('history/:userId')
  async getConversationHistory(
    @Param('userId') userId: string,
  ): Promise<any[]> {
    const conversations =
      await this.aiAssistantService.getConversationHistory(userId);
    return conversations.map((conv) => ({
      question: conv.message,
      answer: conv.response,
      timestamp: conv.createdAt,
    }));
  }
}
