import { Entity, ManyToOne } from '@mikro-orm/core';
import { AuditableEntity } from './base/auditable_entity';
import { BlogPosts } from './blog-post.entity';
import { BlogTags } from './blog-tag.entity';

@Entity({ tableName: 'BlogPostTags' })
export class BlogPostTags extends AuditableEntity {
  @ManyToOne(() => BlogPosts)
  blogPost: BlogPosts;

  @ManyToOne(() => BlogTags)
  blogTag: BlogTags;
}
