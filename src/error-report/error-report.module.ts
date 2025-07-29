import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ErrorReportController } from './error-report.controller';
import { ErrorReportService } from './error-report.service';
import { ErrorList } from './entities/error-list.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ErrorList])],
  controllers: [ErrorReportController],
  providers: [ErrorReportService],
})
export class ErrorReportModule {}
