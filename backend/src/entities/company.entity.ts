import { Entity, Property } from '@mikro-orm/core';
import { AuditableEntity } from './base/auditable_entity';

@Entity({ tableName: 'Company' })
export class Company extends AuditableEntity {
  @Property({ type: 'string' })
  userId: string;

  @Property({ type: 'string' })
  name: string;

  @Property({ type: 'string' })
  taxCode: string;

  @Property({ type: 'string' })
  address: string;

  @Property({ type: 'string' })
  website: string;

  @Property({ type: 'string' })
  industryId: string;

  @Property({ type: 'string' })
  size: string;

  @Property({ type: 'string' })
  description: string;

  @Property({ type: 'string' })
  logoUrl: string;

  @Property({ type: 'string' })
  bannerUrl: string;

  @Property({ type: 'string' })
  contactPerson: string;

  @Property({ type: 'string' })
  contactEmail: string;

  @Property({ type: 'string' })
  contactPhone: string;
}
