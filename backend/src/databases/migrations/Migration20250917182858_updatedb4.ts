import { Migration } from '@mikro-orm/migrations';

export class Migration20250917182858_updatedb4 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`CREATE TABLE [Companies] ([id] nvarchar(255) not null, [created_at] date not null, [updated_at] date null, [name] nvarchar(300) not null, [slug] nvarchar(300) not null, [logo_url] nvarchar(1000) null, [banner_url] nvarchar(1000) null, [industry] nvarchar(200) null, [company_size] nvarchar(50) null, [website] nvarchar(500) null, [location] nvarchar(300) null, [description] text null, [is_verified] bit not null CONSTRAINT [companies_is_verified_default] DEFAULT 0, CONSTRAINT [Companies_pkey] PRIMARY KEY ([id]));`);
    this.addSql(`CREATE UNIQUE INDEX [Companies_slug_unique] ON [Companies] ([slug]) WHERE [slug] IS NOT NULL;`);

    this.addSql(`CREATE TABLE [EmployerProfiles] ([id] nvarchar(255) not null, [created_at] date not null, [updated_at] date null, [user_id] nvarchar(200) null, [company] nvarchar(200) null, [title] nvarchar(200) null, [phone] nvarchar(50) null, CONSTRAINT [EmployerProfiles_pkey] PRIMARY KEY ([id]));`);

    this.addSql(`CREATE TABLE [JobSeekerProfiles] ([id] nvarchar(255) not null, [created_at] date not null, [updated_at] date null, [user_id] nvarchar(200) null, [full_name] nvarchar(300) null, [phone] nvarchar(50) null, [dob] date null, [location] nvarchar(300) null, [summary] text null, [current_title] nvarchar(200) null, [years_experience] int null, CONSTRAINT [JobSeekerProfiles_pkey] PRIMARY KEY ([id]));`);
    this.addSql(`CREATE UNIQUE INDEX [JobSeekerProfiles_user_id_unique] ON [JobSeekerProfiles] ([user_id]) WHERE [user_id] IS NOT NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`if object_id('[Companies]', 'U') is not null DROP TABLE [Companies];`);

    this.addSql(`if object_id('[EmployerProfiles]', 'U') is not null DROP TABLE [EmployerProfiles];`);

    this.addSql(`if object_id('[JobSeekerProfiles]', 'U') is not null DROP TABLE [JobSeekerProfiles];`);
  }

}
