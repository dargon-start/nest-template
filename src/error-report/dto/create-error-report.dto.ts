import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateErrorReportDto {
  // @ApiProperty({ description: 'SDK版本号', required: true })
  // @IsNumber()
  // @IsNotEmpty()
  // sdkVersion: number;

  @ApiProperty({ description: '错误名称', required: true })
  @IsString()
  @IsNotEmpty()
  errorName: string;

  @ApiProperty({ description: '错误类型', required: true })
  @IsString()
  @IsNotEmpty()
  errorType: string;

  // @ApiProperty({ description: '错误消息', required: true })
  // @IsString()
  // @IsNotEmpty()
  // errorMessage: string;

  // @ApiProperty({ description: '设备信息', required: false })
  // @IsString()
  // @IsOptional()
  // deviceInfo?: string;

  // @ApiProperty({ description: '应用版本号', required: false })
  // @IsNumber()
  // @IsOptional()
  // appVersion?: number;
}
