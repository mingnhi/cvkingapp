import { Entity, Property, PrimaryKey } from '@mikro-orm/core';

@Entity({ tableName: 'JobTags' })
export class JobTag {
  @PrimaryKey({ columnType: 'int', autoincrement: true })
  JobTagId: number;

  @Property({ type: 'nvarchar', length: 200, nullable: false, unique: true })
  Name: string;
}
