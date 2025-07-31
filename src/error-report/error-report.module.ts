import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ErrorReportController } from './error-report.controller';
import { ErrorReportService } from './error-report.service';
import { MonitorEvent } from './entities/monitor-event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MonitorEvent])],
  controllers: [ErrorReportController],
  providers: [ErrorReportService],
})
export class ErrorReportModule {}
