import { Entity, Property, ManyToOne } from '@mikro-orm/core';
import { AuditableEntity } from './base/auditable_entity';
import { BlogPosts } from './blog-post.entity';
import { Users } from './user.entity';

@Entity({ tableName: 'BlogComments' })
export class BlogComments extends AuditableEntity {
  @ManyToOne(() => BlogPosts)
  blogPost: BlogPosts;

  @ManyToOne(() => Users, { nullable: true })
  user?: Users;

  @Property({ type: 'string', length: 200, nullable: true })
  guestName?: string;

  @Property({ type: 'text' })
  content: string;

  @Property({ type: 'boolean', default: false })
  isApproved: boolean = false;
}
