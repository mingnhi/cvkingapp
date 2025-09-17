import { Entity, Property } from '@mikro-orm/core';
import { AuditableEntity } from './base/auditable_entity';

@Entity({ tableName: 'BlogPosts' })
export class BlogPosts extends AuditableEntity {
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

  @Property({ type: 'string' })
  authorId: string;

  @Property({ type: 'boolean', default: false })
  isPublished: boolean = false;

  @Property({ type: 'date', nullable: true })
  publishedAt?: Date;
}
