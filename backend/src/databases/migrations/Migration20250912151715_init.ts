import { Migration } from '@mikro-orm/migrations';

export class Migration20250912151715_init extends Migration {

  override async up(): Promise<void> {
    this.addSql(`CREATE TABLE [Company] ([id] nvarchar(255) not null, [created_at] date not null, [updated_at] date null, [user_id] nvarchar(255) not null, [name] nvarchar(255) not null, [tax_code] nvarchar(255) not null, [address] nvarchar(255) not null, [website] nvarchar(255) not null, [industry_id] nvarchar(255) not null, [size] nvarchar(255) not null, [description] nvarchar(255) not null, [logo_url] nvarchar(255) not null, [banner_url] nvarchar(255) not null, [contact_person] nvarchar(255) not null, [contact_email] nvarchar(255) not null, [contact_phone] nvarchar(255) not null, CONSTRAINT [Company_pkey] PRIMARY KEY ([id]));`);

    this.addSql(`CREATE TABLE [Industry] ([id] nvarchar(255) not null, [created_at] date not null, [updated_at] date null, [name] nvarchar(255) not null, [slug] nvarchar(255) not null, [description] nvarchar(255) not null, [parant_id] nvarchar(255) not null, CONSTRAINT [Industry_pkey] PRIMARY KEY ([id]));`);

    this.addSql(`CREATE TABLE [Roles] ([id] nvarchar(255) not null, [created_at] date not null, [updated_at] date null, [name] nvarchar(255) not null, [description] nvarchar(255) not null, CONSTRAINT [Roles_pkey] PRIMARY KEY ([id]));`);

    this.addSql(`CREATE TABLE [UserRoles] ([id] nvarchar(255) not null, [created_at] date not null, [updated_at] date null, [user_id] nvarchar(255) not null, [role_id] nvarchar(255) not null, [is_active] bit not null, CONSTRAINT [UserRoles_pkey] PRIMARY KEY ([id]));`);

    this.addSql(`CREATE TABLE [Users] ([id] nvarchar(255) not null, [created_at] date not null, [updated_at] date null, [email] nvarchar(255) not null, [password] nvarchar(255) not null, [is_active] bit not null CONSTRAINT [users_is_active_default] DEFAULT 1, [is_verify] bit not null CONSTRAINT [users_is_verify_default] DEFAULT 0, [otp_code] nvarchar(255) null, CONSTRAINT [Users_pkey] PRIMARY KEY ([id]));`);
  }

  override async down(): Promise<void> {
    this.addSql(`if object_id('[Company]', 'U') is not null DROP TABLE [Company];`);

    this.addSql(`if object_id('[Industry]', 'U') is not null DROP TABLE [Industry];`);

    this.addSql(`if object_id('[Roles]', 'U') is not null DROP TABLE [Roles];`);

    this.addSql(`if object_id('[UserRoles]', 'U') is not null DROP TABLE [UserRoles];`);

    this.addSql(`if object_id('[Users]', 'U') is not null DROP TABLE [Users];`);
  }

}
