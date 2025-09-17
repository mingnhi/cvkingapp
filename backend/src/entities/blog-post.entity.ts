import { Entity, Property, PrimaryKey } from '@mikro-orm/core';

@Entity({ tableName: 'BlogPosts' })
export class BlogPosts {
  @PrimaryKey({ type: 'int', autoincrement: true })
  blogPostId: number;

  @Property({ type: 'string', length: 500 })
  title: string;

  @Property({ type: 'string', length: 500, unique: true })
  slug: string;

  @Property({ type: 'text' })
  content: string;

  @Property({ type: 'string', length: 1000, nullable: true })
  excerpt?: string;

  @Property({ type: 'string', length: 1000, nullable: true })
  coverImageUrl?: string;

  @Property({ type: 'int' })
  authorUserId: number;

  @Property({ type: 'boolean', default: false })
  isPublished: boolean = false;

  @Property({ type: 'date', nullable: true })
  publishedAt?: Date;

  @Property({ type: 'date', default: 'SYSDATETIME' })
  createdAt: Date;

  @Property({ type: 'date', nullable: true })
  updatedAt?: Date;
}
