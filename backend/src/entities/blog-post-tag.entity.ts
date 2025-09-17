import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'BlogPostTags' })
export class BlogPostTags {
  @PrimaryKey()
  @Property({ type: 'string' })
  blogPostId: string;

  @PrimaryKey()
  @Property({ type: 'string' })
  blogTagId: string;
}
