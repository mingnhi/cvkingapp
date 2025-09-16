import { Collection, Entity, ManyToMany, Property, PrimaryKey } from '@mikro-orm/core';
import { Job } from './job.entity';

@Entity({ tableName: 'JobTags' })
export class JobTag {
  @PrimaryKey({ columnType: 'int', autoincrement: true })
  JobTagId: number;

  @Property({ type: 'nvarchar', length: 200, nullable: false, unique: true })
  Name: string;

  @ManyToMany(() => Job, 'tags')
  jobs = new Collection<Job>(this);
}
