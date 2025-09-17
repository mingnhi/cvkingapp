import { Entity, Property, PrimaryKey } from '@mikro-orm/core';

@Entity({ tableName: 'JobJobTags' })
export class JobJobTags {
  @PrimaryKey({ columnType: 'int', autoincrement: true })
  JobJobTagId: number;

  @Property({ columnType: 'int' })
  JobId: number;

  @Property({ columnType: 'int' })
  JobTagId: number;

  @Property({ type: 'bit' })
  isActive: boolean;
}
