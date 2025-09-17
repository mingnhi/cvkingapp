import { Entity, Property, PrimaryKey } from '@mikro-orm/core';

@Entity({ tableName: 'BlogComments' })
export class BlogComments {
  @PrimaryKey({ type: 'int', autoincrement: true })
  commentId: number;

  @Property({ type: 'int' })
  blogPostId: number;

  @Property({ type: 'int', nullable: true })
  userId?: number;

  @Property({ type: 'string', length: 200, nullable: true })
  guestName?: string;

  @Property({ type: 'text' })
  content: string;

  @Property({ type: 'boolean', default: false })
  isApproved: boolean = false;

  @Property({ type: 'date', default: 'SYSDATETIME' })
  createdAt: Date;
}
