import { Controller, Post, Body, Res } from '@nestjs/common';
import { AiAssistantService } from './ai-assistant.service';
import { Response } from 'express';
import { ChatCompletionMessageParam } from 'openai/resources/index';
import { Readable } from 'stream';

@Controller('ai-assistant')
export class AiAssistantController {
  constructor(private readonly aiAssistantService: AiAssistantService) {}

  @Post('ask')
  ask(
    @Res() res: Response,
    @Body('userId') userId: string,
    @Body('question') question: ChatCompletionMessageParam[],
  ) {
    const stream = this.aiAssistantService.askQuestion(userId, question);
    const nodeStream = Readable.from(stream);

    res.setHeader('Content-Type', 'text/event-stream;charset=UTF-8');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    nodeStream.on('data', (chunk: Buffer | string) => {
      // SSE 格式：每条消息以 data: 开头，两个换行结尾
      res.write(`data: ${chunk.toString()}\n\n`);
    });

    nodeStream.on('end', () => {
      res.write('event: end\ndata: [DONE]\n\n');
      res.end();
    });

    nodeStream.on('error', (err) => {
      res.write(`event: error\ndata: ${err.message}\n\n`);
      res.end();
    });
  }
}
