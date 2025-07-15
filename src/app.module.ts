import { Module, ValidationPipe } from '@nestjs/common';
// import { APP_PIPE, APP_GUARD } from '@nestjs/core';

// import { AiAssistantModule } from './ai-assistant/ai-assistant.module'; // AI对话模块
import { UserModule } from './user/user.module';
import { UploadModule } from './upload/upload.module';
// import { RoleGuard } from './role/role.guard'; // 角色守卫
@Module({
  imports: [
    // AiAssistantModule,
    UserModule,
    UploadModule,
  ], // 集成TypeORM和AI对话模块
  providers: [
    // 全局使用ValidationPipe进行数据验证
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    // 全局使用角色守卫
    // {
    //   provide: APP_GUARD,
    //   useClass: RoleGuard,
    // },
  ],
})
export class AppModule {}
