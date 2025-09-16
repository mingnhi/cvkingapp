import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { AuditableEntity } from './base/auditable_entity';
import { Users } from './user.entity';
import { Roles } from './role.entity';
@Entity({ tableName: 'UserRoles' })
export class UserRole extends AuditableEntity {
  @PrimaryKey({ type: 'number', autoincrement: true })
  userRoleId!: number;
  
  @ManyToOne(() => Users, { deleteRule: 'cascade' })
  user!: Users;

  @ManyToOne(() => Roles)
  role!: Roles;

  @Property({ type: 'date', defaultRaw: 'SYSUTCDATETIME()' })
  assignedAt: Date = new Date();
}
