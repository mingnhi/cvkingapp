import { Collection, Entity, ManyToMany, Property, PrimaryKey } from '@mikro-orm/core';
import { Job } from './job.entity';

@Entity({ tableName: 'Skills' })
export class Skill {
  @PrimaryKey({ columnType: 'int', autoincrement: true })
  SkillId: number;

  @Property({ type: 'nvarchar', length: 200, nullable: false, unique: true })
  Name: string;

  @ManyToMany(() => Job, 'skills')
  jobs = new Collection<Job>(this);
}
