import { CreateBlogDto } from './create-blog.dto';

export class UpdateBlogDto extends CreateBlogDto {
  id: string;
  Status?: string;
}
