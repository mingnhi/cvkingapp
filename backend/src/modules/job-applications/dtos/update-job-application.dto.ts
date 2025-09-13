import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApplicationStatus } from '../../../entities/job-application.entity';

export class UpdateJobApplicationDto {
  @IsEnum(ApplicationStatus)
  @IsOptional()
  status?: ApplicationStatus;

  @IsString()
  @IsOptional()
  coverLetter?: string;
}


