import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';

import { UserModule } from './user/user.module';
import { UploadModule } from './upload/upload.module';
import { ErrorReportModule } from './error-report/error-report.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    // AiAssistantModule,
    UserModule,
    UploadModule,
    ErrorReportModule,
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
    PrismaService,
  ],
  exports: [PrismaService],
})
export class AppModule {}
