import { Entity, PrimaryKey, Property, ManyToMany, Collection } from '@mikro-orm/core';
import { Users } from './user.entity';

@Entity({ tableName: 'Roles' })
export class Roles {
  @PrimaryKey({ columnType: 'int', autoincrement: true })
  RoleId: number;

  @Property({ type: 'nvarchar', length: 50, nullable: false, unique: true })
  RoleName: string;

  @Property({ type: 'nvarchar', length: 255, nullable: true })
  Description?: string;

  @Property({
    type: 'datetime2',
    nullable: false,
    defaultRaw: 'SYSUTCDATETIME()',
  })
  CreatedAt: Date = new Date();

  @ManyToMany(() => Users, users => users.roles, {
    owner: true,
    pivotTable: 'UserRoles',
    joinColumn: 'RoleId',
    inverseJoinColumn: 'UserId'
  })
  users = new Collection<Users>(this);
}
