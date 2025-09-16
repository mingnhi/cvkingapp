import { Collection, Entity, OneToMany, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { AuditableEntity } from './base/auditable_entity';
import { UserRole } from './user_role.entity';
@Entity({ tableName: 'Users' })
export class Users extends AuditableEntity {
  @PrimaryKey({ type: 'number', autoincrement: true })
  userId!: number;

  @Property({ type: 'string' })
  @Unique()
  email: string;

  @Property({ type: 'string' })
  password: string;

  @Property({ type: 'boolean', default: false })
  isEmailConfirmed: boolean = false;

  @Property({ type: 'date', nullable: true })
  lastLoginAt?: Date;

  @Property({ type: 'boolean', default: true })
  isActive: boolean = true;

  @Property({ type: 'boolean', default: false })
  isDeleted: boolean = false;

  @Property({ type: 'string', nullable: true })
  displayName?: string;

  @Property({ type: 'string', nullable: true })
  avatarUrl?: string;

  @Property({ type: 'string', nullable: true })
  preferredLocale?: string;

  @Property({ type: 'string', nullable: true })
  googleId?: string;

  @Property({ type: 'string', nullable: true })
  linkedInId?: string;

  @Property({ type: 'string', nullable: true })
  refreshToken?: string;

  @OneToMany(() => UserRole, (userRole) => userRole.user)
  userRoles = new Collection<UserRole>(this);
}
