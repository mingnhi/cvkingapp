import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateJobApplicationDto {
  @IsNotEmpty()
  @IsString()
  jobId: string;

  @IsOptional()
  @IsString()
  cvId?: string;

  @IsOptional()
  @IsString()
  coverLetter?: string;
}
