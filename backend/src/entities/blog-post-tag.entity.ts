import { Entity, Property } from '@mikro-orm/core';
import { AuditableEntity } from './base/auditable_entity';

@Entity({ tableName: 'BlogPostTags' })
export class BlogPostTags extends AuditableEntity {
  @Property({ type: 'int', fieldName: 'BlogPostId' })
  blogPostId: number;

  @Property({ type: 'int', fieldName: 'BlogTagId' })
  blogTagId: number;
}
