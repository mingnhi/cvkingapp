export class CreateBlogCommentDto {
  BlogPostId: string; // Frontend gửi BlogPostId
  UserId?: string;    // Frontend gửi UserId
  GuestName?: string; // Frontend gửi GuestName
  Content: string;
  ParentCommentId?: string;

  // Map to database field names for stored procedures
  get blog_post_id(): string {
    return this.BlogPostId;
  }

  get user_id(): string | undefined {
    return this.UserId;
  }

  get guest_name(): string | undefined {
    return this.GuestName;
  }

  get is_approved(): boolean {
    return false; // Comments start as unapproved
  }
}

export class UpdateBlogCommentDto {
  Content?: string;
  IsApproved?: boolean;

  // Map to database field names for stored procedures
  get is_approved(): boolean | undefined {
    return this.IsApproved;
  }
}
