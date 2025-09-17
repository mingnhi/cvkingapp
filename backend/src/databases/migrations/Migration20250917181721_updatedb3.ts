import { Migration } from '@mikro-orm/migrations';

export class Migration20250917181721_updatedb3 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table [Users] alter column [refresh_token] nvarchar(max);`);

    this.addSql(`alter table [Users] alter column [refresh_token] nvarchar(1000);`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table [Users] alter column [refresh_token] nvarchar(255);`);
  }

}
