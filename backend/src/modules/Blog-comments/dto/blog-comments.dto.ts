export class CreateBlogCommentDto {
  BlogPostId: string;
  UserId?: string;
  GuestName?: string;
  Content: string;
  ParentCommentId?: string;
}

export class UpdateBlogCommentDto {
  Content?: string;
  IsApproved?: boolean;
}
