import { Migration } from '@mikro-orm/migrations';

export class Migration20250917153810 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`CREATE TABLE [BlogComments] ([id] nvarchar(255) not null, [updated_at] date null, [blog_post_id] nvarchar(500) null, [user_id] nvarchar(500) null, [content] text not null, [is_approved] bit not null CONSTRAINT [blogcomments_is_approved_default] DEFAULT 0, [created_at] date not null CONSTRAINT [blogcomments_created_at_default] DEFAULT 'SYSDATETIME', CONSTRAINT [BlogComments_pkey] PRIMARY KEY ([id]));`);

    this.addSql(`CREATE TABLE [BlogPosts] ([id] nvarchar(255) not null, [created_at] date not null, [updated_at] date null, [title] nvarchar(500) not null, [slug] nvarchar(500) not null, [content] text not null, [excerpt] nvarchar(1000) null, [cover_image_url] nvarchar(1000) null, [author_id] nvarchar(255) not null, [is_published] bit not null CONSTRAINT [blogposts_is_published_default] DEFAULT 0, [published_at] date null, CONSTRAINT [BlogPosts_pkey] PRIMARY KEY ([id]));`);
    this.addSql(`CREATE UNIQUE INDEX [BlogPosts_slug_unique] ON [BlogPosts] ([slug]) WHERE [slug] IS NOT NULL;`);

    this.addSql(`CREATE TABLE [BlogPostTags] ([id] nvarchar(255) not null, [created_at] date not null, [updated_at] date null, [blog_post_id] nvarchar(500) null, [blog_tag_id] nvarchar(500) null, CONSTRAINT [BlogPostTags_pkey] PRIMARY KEY ([id]));`);

    this.addSql(`CREATE TABLE [BlogTags] ([id] nvarchar(255) not null, [updated_at] date null, [name] nvarchar(200) not null, [created_at] date not null CONSTRAINT [blogtags_created_at_default] DEFAULT 'SYSDATETIME', CONSTRAINT [BlogTags_pkey] PRIMARY KEY ([id]));`);
    this.addSql(`CREATE UNIQUE INDEX [BlogTags_name_unique] ON [BlogTags] ([name]) WHERE [name] IS NOT NULL;`);

    this.addSql(`CREATE TABLE [Jobs] ([id] nvarchar(255) not null, [created_at] date not null, [updated_at] date null, [company_id] nvarchar(255) not null, [posted_by_user_id] nvarchar(255) null, [title] nvarchar(500) not null, [slug] nvarchar(500) not null, [short_description] nvarchar(1000) null, [description] nvarchar(max) null, [requirements] nvarchar(max) null, [benefits] nvarchar(max) null, [salary_min] int null, [salary_max] int null, [currency] nvarchar(10) null, [job_type] nvarchar(50) null, [location] nvarchar(300) null, [category_id] int null, [status] nvarchar(50) not null CONSTRAINT [jobs_status_default] DEFAULT 'Active', [views_count] int not null CONSTRAINT [jobs_views_count_default] DEFAULT 0, [posted_at] datetime2 not null CONSTRAINT [jobs_posted_at_default] DEFAULT SYSUTCDATETIME(), [expires_at] datetime2 null, CONSTRAINT [Jobs_pkey] PRIMARY KEY ([id]));`);
    this.addSql(`CREATE UNIQUE INDEX [Jobs_slug_unique] ON [Jobs] ([slug]) WHERE [slug] IS NOT NULL;`);

    this.addSql(`CREATE TABLE [job_applications] ([id] nvarchar(255) not null, [created_at] date not null, [job_id] nvarchar(255) not null, [job_seeker_id] nvarchar(255) not null, [cover_letter] text null, [status] nvarchar(100) check ([status] in ('Pending', 'Reviewed', 'Interview', 'Rejected', 'Hired')) not null CONSTRAINT [job_applications_status_default] DEFAULT 'Pending', [applied_at] datetime2 not null, [updated_at] datetime2 null, [is_deleted] bit not null CONSTRAINT [job_applications_is_deleted_default] DEFAULT 0, CONSTRAINT [job_applications_pkey] PRIMARY KEY ([id]));`);

    this.addSql(`CREATE TABLE [JobCategories] ([id] nvarchar(255) not null, [created_at] date not null, [updated_at] date null, [name] nvarchar(200) not null, CONSTRAINT [JobCategories_pkey] PRIMARY KEY ([id]));`);
    this.addSql(`CREATE UNIQUE INDEX [JobCategories_name_unique] ON [JobCategories] ([name]) WHERE [name] IS NOT NULL;`);

    this.addSql(`CREATE TABLE [JobJobTags] ([id] nvarchar(255) not null, [job_id] nvarchar(255) not null, [job_tag_id] nvarchar(255) not null, [created_at] date not null, [updated_at] date null, CONSTRAINT [JobJobTags_pkey] PRIMARY KEY ([id], [job_id], [job_tag_id]));`);

    this.addSql(`CREATE TABLE [JobSkills] ([id] nvarchar(255) not null, [job_id] nvarchar(255) not null, [skill_id] nvarchar(255) not null, [created_at] date not null, [updated_at] date null, CONSTRAINT [JobSkills_pkey] PRIMARY KEY ([id], [job_id], [skill_id]));`);

    this.addSql(`CREATE TABLE [JobTags] ([id] nvarchar(255) not null, [created_at] date not null, [updated_at] date null, [name] nvarchar(200) not null, CONSTRAINT [JobTags_pkey] PRIMARY KEY ([id]));`);
    this.addSql(`CREATE UNIQUE INDEX [JobTags_name_unique] ON [JobTags] ([name]) WHERE [name] IS NOT NULL;`);

    this.addSql(`CREATE TABLE [saved_jobs] ([id] nvarchar(255) not null, [created_at] date not null, [updated_at] date null, [job_seeker_id] nvarchar(255) not null, [job_id] nvarchar(255) not null, CONSTRAINT [saved_jobs_pkey] PRIMARY KEY ([id]));`);
    this.addSql(`CREATE UNIQUE INDEX [saved_jobs_job_seeker_id_job_id_unique] ON [saved_jobs] ([job_seeker_id], [job_id]) WHERE [job_seeker_id] IS NOT NULL AND [job_id] IS NOT NULL;`);

    this.addSql(`CREATE TABLE [Skills] ([id] nvarchar(255) not null, [created_at] date not null, [updated_at] date null, [name] nvarchar(200) not null, CONSTRAINT [Skills_pkey] PRIMARY KEY ([id]));`);
    this.addSql(`CREATE UNIQUE INDEX [Skills_name_unique] ON [Skills] ([name]) WHERE [name] IS NOT NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`if object_id('[BlogComments]', 'U') is not null DROP TABLE [BlogComments];`);

    this.addSql(`if object_id('[BlogPosts]', 'U') is not null DROP TABLE [BlogPosts];`);

    this.addSql(`if object_id('[BlogPostTags]', 'U') is not null DROP TABLE [BlogPostTags];`);

    this.addSql(`if object_id('[BlogTags]', 'U') is not null DROP TABLE [BlogTags];`);

    this.addSql(`if object_id('[Jobs]', 'U') is not null DROP TABLE [Jobs];`);

    this.addSql(`if object_id('[job_applications]', 'U') is not null DROP TABLE [job_applications];`);

    this.addSql(`if object_id('[JobCategories]', 'U') is not null DROP TABLE [JobCategories];`);

    this.addSql(`if object_id('[JobJobTags]', 'U') is not null DROP TABLE [JobJobTags];`);

    this.addSql(`if object_id('[JobSkills]', 'U') is not null DROP TABLE [JobSkills];`);

    this.addSql(`if object_id('[JobTags]', 'U') is not null DROP TABLE [JobTags];`);

    this.addSql(`if object_id('[saved_jobs]', 'U') is not null DROP TABLE [saved_jobs];`);

    this.addSql(`if object_id('[Skills]', 'U') is not null DROP TABLE [Skills];`);
  }

}
