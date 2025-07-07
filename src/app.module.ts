import { Module } from '@nestjs/common';
// import { AiAssistantModule } from './ai-assistant/ai-assistant.module'; // AI对话模块
import { UserModule } from './user/user.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    // AiAssistantModule,
    UserModule,
    UploadModule,
  ], // 集成TypeORM和AI对话模块
})
export class AppModule {}
