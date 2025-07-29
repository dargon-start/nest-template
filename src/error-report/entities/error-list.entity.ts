import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { FormatDateColumn } from 'src/common/decorator';

@Entity()
export class ErrorList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  errorName: string;

  @Column()
  errorType: string;

  @CreateDateColumn()
  @FormatDateColumn()
  createTime: Date;
}
