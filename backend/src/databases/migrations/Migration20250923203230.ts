import { Migration } from '@mikro-orm/migrations';

export class Migration20250923203230 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table [Users] alter column [username] nvarchar(255) null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table [Users] alter column [username] nvarchar(255) not null;`);
  }

}
