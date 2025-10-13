export class CreateBlogDto {
  AuthorId: string;
  Title: string;
  Slug: string;
  Content: string;
  Excerpt?: string;
  CoverImageUrl?: string;
  CategoryId?: string;
  IsPublished?: boolean;
  PublishedAt?: Date;
  TagIds?: string[];
  ShortDescription?: string;

  // Keep backwards compatibility
  title?: string;
  slug?: string;
  content?: string;
  excerpt?: string;
  coverImageUrl?: string;
  authorId?: string;
  isPublished?: boolean;
  tagIds?: string[];
  shortDescription?: string;
  categoryId?: string;
}
