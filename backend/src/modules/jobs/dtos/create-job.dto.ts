import {
  IsArray,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { JobStatus } from '../../../entities/job.entity';

export class CreateJobDto {
  @IsUUID()
  @IsNotEmpty()
  companyId!: string;

  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  slug!: string;

  @IsString()
  @IsOptional()
  shortDescription?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  requirements?: string;

  @IsString()
  @IsOptional()
  benefits?: string;

  @IsNumber()
  @IsOptional()
  salaryMin?: number;

  @IsNumber()
  @IsOptional()
  salaryMax?: number;

  @IsString()
  @IsOptional()
  currency?: string;

  @IsString()
  @IsOptional()
  jobType?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsUUID()
  @IsOptional()
  categoryId?: string;

  @IsEnum(JobStatus)
  @IsOptional()
  status?: JobStatus;

  @IsDate()
  @IsOptional()
  expiresAt?: Date;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  skills?: string[];

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  tags?: string[];
}
