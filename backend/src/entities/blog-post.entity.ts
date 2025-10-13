import { Entity, Property } from '@mikro-orm/core';
import { AuditableEntity } from './base/auditable_entity';

export enum BlogStatus {
  ACTIVE = 'Active',
  DRAFT = 'Draft',
  EXPIRED = 'Expired',
  CLOSED = 'Closed',
}

@Entity({ tableName: 'BlogPosts' })
export class BlogPosts extends AuditableEntity {
  @Property({ type: 'string', length: 500, fieldName: 'Title' })
  title: string;

  @Property({ type: 'string', length: 500, unique: true, fieldName: 'Slug' })
  slug: string;

  @Property({ type: 'text', fieldName: 'Content' })
  content: string;

  @Property({
    type: 'string',
    length: 1000,
    nullable: true,
    fieldName: 'Excerpt',
  })
  excerpt?: string;

  @Property({
    type: 'string',
    length: 1000,
    nullable: true,
    fieldName: 'CoverImageUrl',
  })
  coverImageUrl?: string;

  @Property({ type: 'int', fieldName: 'AuthorUserId' })
  authorUserId: number;

  @Property({ type: 'boolean', default: false, fieldName: 'IsPublished' })
  isPublished: boolean = false;

  @Property({ type: 'datetime2', nullable: true, fieldName: 'PublishedAt' })
  publishedAt?: Date;

  @Property({
    type: 'string',
    length: 50,
    nullable: false,
    default: BlogStatus.ACTIVE,
    fieldName: 'Status',
  })
  status: string = BlogStatus.ACTIVE;

  @Property({
    type: 'int',
    nullable: false,
    default: 0,
    fieldName: 'ViewsCount',
  })
  viewsCount: number = 0;

  @Property({
    type: 'datetime2',
    nullable: false,
    defaultRaw: 'SYSUTCDATETIME()',
    fieldName: 'PostedAt',
  })
  postedAt: Date = new Date();

  @Property({ type: 'datetime2', nullable: true, fieldName: 'ExpiresAt' })
  expiresAt?: Date;
}
