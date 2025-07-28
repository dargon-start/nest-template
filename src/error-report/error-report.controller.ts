import { Controller, Post, Get, Body } from '@nestjs/common';
import { ErrorReportService } from './error-report.service';
import { CreateErrorReportDto } from './dto/create-error-report.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@Controller('error')
@ApiTags('错误报告')
export class ErrorReportController {
  constructor(private readonly errorReportService: ErrorReportService) {}

  @Post('report')
  @ApiOperation({ summary: '上报SDK错误信息' })
  @ApiResponse({ status: 200, description: '错误信息上报成功' })
  @ApiBody({ type: CreateErrorReportDto })
  create(@Body() createErrorReportDto: CreateErrorReportDto) {
    console.log('收到错误信息：', createErrorReportDto);

    return this.errorReportService.create(createErrorReportDto);
  }

  @Get('list')
  @ApiOperation({ summary: '获取错误信息列表' })
  @ApiResponse({ status: 200, description: '返回错误信息列表' })
  findAll() {
    return this.errorReportService.findAll();
  }
}
