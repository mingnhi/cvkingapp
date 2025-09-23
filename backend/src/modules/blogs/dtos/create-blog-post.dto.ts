import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreateBlogPostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsOptional()
  excerpt?: string;

  @IsString()
  @IsOptional()
  coverImageUrl?: string;

  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;

  @IsOptional()
  @IsString({ each: true })
  tags?: string[];
}
