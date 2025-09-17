import { Entity, Property, PrimaryKey } from '@mikro-orm/core';

@Entity({ tableName: 'BlogPostTags' })
export class BlogPostTags {
  @PrimaryKey({ type: 'int', autoincrement: true })
  blogPostTagId: number;

  @Property({ type: 'int' })
  blogPostId: number;

  @Property({ type: 'int' })
  blogTagId: number;
}
