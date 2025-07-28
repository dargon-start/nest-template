import { Injectable } from '@nestjs/common';
import { CreateErrorReportDto } from './dto/create-error-report.dto';
import { PrismaClient, ErrorList } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class ErrorReportService {
  async create(createErrorReportDto: CreateErrorReportDto) {
    // TODO: 实现错误数据存储逻辑
    console.log('Received error report:', createErrorReportDto);

    await prisma.errorList.create({
      data: createErrorReportDto,
    });
    return '上报成功';
  }

  async findAll() {
    // 从数据库中获取错误信息列表
    const errorReports: ErrorList[] = await prisma.errorList.findMany();
    const data = {
      total: errorReports.length,
      list: errorReports,
    };
    return data;
  }
}
