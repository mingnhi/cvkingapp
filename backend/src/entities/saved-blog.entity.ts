import { Entity, Property, Unique } from '@mikro-orm/core';
import { AuditableEntity } from './base/auditable_entity';

@Entity({ tableName: 'saved_blogs' })
@Unique({ properties: ['userId', 'blogPostId'] })
export class SavedBlog extends AuditableEntity {
  @Property({ type: 'string', fieldName: 'user_id' })
  userId: string;

  @Property({ type: 'int', fieldName: 'blog_post_id' })
  blogPostId: number;
}
