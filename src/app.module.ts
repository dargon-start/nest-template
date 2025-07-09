import { Module, ValidationPipe } from '@nestjs/common';
// import { AiAssistantModule } from './ai-assistant/ai-assistant.module'; // AI对话模块
import { UserModule } from './user/user.module';
import { UploadModule } from './upload/upload.module';
import { APP_PIPE } from '@nestjs/core';
@Module({
  imports: [
    // AiAssistantModule,
    UserModule,
    UploadModule,
  ], // 集成TypeORM和AI对话模块
  providers: [
    {
      // 全局使用ValidationPipe进行数据验证
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
