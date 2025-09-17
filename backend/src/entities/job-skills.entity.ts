import { Entity, Property, PrimaryKey } from '@mikro-orm/core';

@Entity({ tableName: 'JobSkills' })
export class JobSkills {
  @PrimaryKey({ columnType: 'int', autoincrement: true })
  JobSkillId: number;

  @Property({ columnType: 'int' })
  JobId: number;

  @Property({ columnType: 'int' })
  SkillId: number;

  @Property({ type: 'bit' })
  isActive: boolean;
}
