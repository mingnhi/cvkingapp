import { Entity, Property, PrimaryKey } from '@mikro-orm/core';

@Entity({ tableName: 'Skills' })
export class Skill {
  @PrimaryKey({ columnType: 'int', autoincrement: true })
  SkillId: number;

  @Property({ type: 'nvarchar', length: 200, nullable: false, unique: true })
  Name: string;
}
