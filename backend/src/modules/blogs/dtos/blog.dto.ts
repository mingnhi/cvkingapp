import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsUUID } from 'class-validator';

export class CreateBlogDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsOptional()
  excerpt?: string;

  @IsString()
  @IsOptional()
  coverImageUrl?: string;

  @IsUUID()
  authorId: string;

  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;
}

export class UpdateBlogDto extends CreateBlogDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
