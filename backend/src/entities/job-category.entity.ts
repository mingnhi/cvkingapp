import { Entity, Property, PrimaryKey } from '@mikro-orm/core';

@Entity({ tableName: 'JobCategories' })
export class JobCategory {
  @PrimaryKey({ columnType: 'int', autoincrement: true })
  JobCategoryId: number;

  @Property({ type: 'nvarchar', length: 200, nullable: false, unique: true })
  Name: string;
}
