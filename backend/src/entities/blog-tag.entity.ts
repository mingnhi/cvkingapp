import { Entity, Property, PrimaryKey } from '@mikro-orm/core';

@Entity({ tableName: 'BlogTags' })
export class BlogTags {
  @PrimaryKey({ type: 'int', autoincrement: true })
  blogTagId: number;

  @Property({ type: 'string', length: 200, unique: true })
  name: string;

  @Property({ type: 'date', default: 'SYSDATETIME' })
  createdAt: Date;
}
