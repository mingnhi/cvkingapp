import { Entity, Property } from '@mikro-orm/core';
import { AuditableEntity } from './base/auditable_entity';

@Entity({ tableName: 'BlogPostTags' })
export class BlogPostTags extends AuditableEntity {
  @Property({ type: 'string' })
  blogPostId: string;

  @Property({ type: 'string' })
  blogTagId: string;
}
