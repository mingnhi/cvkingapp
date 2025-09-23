import { Migration } from '@mikro-orm/migrations';

export class Migration20250917175738_updatedb2 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`CREATE TABLE [Roles] ([id] nvarchar(255) not null, [created_at] date not null, [updated_at] date null, [role_name] nvarchar(255) not null, [description] nvarchar(255) null, CONSTRAINT [Roles_pkey] PRIMARY KEY ([id]));`);
    this.addSql(`CREATE UNIQUE INDEX [Roles_role_name_unique] ON [Roles] ([role_name]) WHERE [role_name] IS NOT NULL;`);

    this.addSql(`CREATE TABLE [UserRoles] ([id] nvarchar(255) not null, [created_at] date not null, [updated_at] date null, [user_id] nvarchar(255) not null, [role_id] nvarchar(255) not null, CONSTRAINT [UserRoles_pkey] PRIMARY KEY ([id]));`);

    this.addSql(`CREATE TABLE [Users] ([id] nvarchar(255) not null, [created_at] date not null, [updated_at] date null, [email] nvarchar(255) not null, [password] nvarchar(255) not null, [is_email_confirmed] bit not null CONSTRAINT [users_is_email_confirmed_default] DEFAULT 0, [last_login_at] date null, [is_active] bit not null CONSTRAINT [users_is_active_default] DEFAULT 1, [is_deleted] bit not null CONSTRAINT [users_is_deleted_default] DEFAULT 0, [display_name] nvarchar(255) null, [avatar_url] nvarchar(255) null, [preferred_locale] nvarchar(255) null, [google_id] nvarchar(255) null, [linked_in_id] nvarchar(255) null, [refresh_token] nvarchar(255) null, CONSTRAINT [Users_pkey] PRIMARY KEY ([id]));`);
    this.addSql(`CREATE UNIQUE INDEX [Users_email_unique] ON [Users] ([email]) WHERE [email] IS NOT NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`if object_id('[Roles]', 'U') is not null DROP TABLE [Roles];`);

    this.addSql(`if object_id('[UserRoles]', 'U') is not null DROP TABLE [UserRoles];`);

    this.addSql(`if object_id('[Users]', 'U') is not null DROP TABLE [Users];`);
  }

}
