import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateErrorReportDto } from './dto/create-error-report.dto';
import { ErrorList } from './entities/error-list.entity';

@Injectable()
export class ErrorReportService {
  constructor(
    @InjectRepository(ErrorList)
    private readonly errorListRepository: Repository<ErrorList>,
  ) {}

  async create(createErrorReportDto: CreateErrorReportDto) {
    // TODO: 实现错误数据存储逻辑
    console.log('Received error report:', createErrorReportDto);

    await this.errorListRepository.save(createErrorReportDto);
    return '上报成功';
  }

  async findAll() {
    // 从数据库中获取错误信息列表
    const errorReports = await this.errorListRepository.find();
    const data = {
      total: errorReports.length,
      list: errorReports,
    };
    return data;
  }
}
