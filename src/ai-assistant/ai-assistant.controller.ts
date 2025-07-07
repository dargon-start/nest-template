import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { AiAssistantService } from './ai-assistant.service';
import { CreateConversationDto } from './dto/create-conversation.dto';

@Controller('ai-assistant/conversation')
export class AiAssistantController {
  constructor(private readonly aiService: AiAssistantService) {}

  @Post()
  async create(@Body() dto: CreateConversationDto) {
    return this.aiService.createMessage(dto);
  }

  @Get(':sessionId')
  async getHistory(@Param('sessionId') sessionId: string) {
    return this.aiService.getHistory(sessionId);
  }
}
