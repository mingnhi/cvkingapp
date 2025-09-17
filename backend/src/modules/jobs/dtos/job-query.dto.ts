import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { JobStatus } from '../../../entities/job.entity';

export class JobQueryDto {
  @IsString()
  @IsOptional()
  key?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsString()
  @IsOptional()
  jobType?: string;

  @IsUUID()
  @IsOptional()
  categoryId?: string;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  skills?: string[];

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  tags?: string[];

  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  salaryMin?: number;

  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  salaryMax?: number;

  @IsEnum(JobStatus)
  @IsOptional()
  status?: JobStatus;

  @IsString()
  @IsOptional()
  sortBy?: string = 'postedAt';

  @IsString()
  @IsOptional()
  sortOrder?: 'ASC' | 'DESC' = 'DESC';
}
