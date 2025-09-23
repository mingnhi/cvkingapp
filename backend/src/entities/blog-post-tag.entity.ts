import { Entity, Property } from '@mikro-orm/core';
import { AuditableEntity } from './base/auditable_entity';

@Entity({ tableName: 'BlogPostTags' })
export class BlogPostTags extends AuditableEntity {
  @Property({ type: 'string', length: 500, nullable: true })
  blogPostId?: string;

  @Property({ type: 'string', length: 500, nullable: true })
  blogTagId?: string;
}
