use JOB_DB
go

create procedure [dbo].[SP_InsertJob]
(
    @CompanyId varchar(max),
    @PostedByUserId varchar(max) = null,
    @Title nvarchar(500),
    @Slug nvarchar(500),
    @ShortDescription nvarchar(1000) = null,
    @Description nvarchar(max) = null,
    @Requirements nvarchar(max) = null,
    @Benefits nvarchar(max) = null,
    @SalaryMin int = null,
    @SalaryMax int = null,
    @Currency nvarchar(10) = null,
    @JobType nvarchar(50) = null,
    @Location nvarchar(300) = null,
    @CategoryId int = null,
    @Status nvarchar(50) = 'Active',
    @ViewsCount int = 0,
    @PostedAt datetime2 = null,
    @ExpiresAt datetime2 = null,
    @skills varchar(max) = null,
    @tags varchar(max) = null
)
as
begin
    declare @JobId varchar(max)
    set @JobId = newid()

    if @PostedAt is null set @PostedAt = SYSUTCDATETIME()

    insert into Jobs(id, company_id, posted_by_user_id, title, slug, short_description, description, requirements, benefits, salary_min, salary_max, currency, job_type, location, category_id, status, views_count, posted_at, expires_at, created_at, updated_at)
    values (@JobId, @CompanyId, @PostedByUserId, @Title, @Slug, @ShortDescription, @Description, @Requirements, @Benefits, @SalaryMin, @SalaryMax, @Currency, @JobType, @Location, @CategoryId, @Status, @ViewsCount, @PostedAt, @ExpiresAt, SYSUTCDATETIME(), SYSUTCDATETIME())

    -- Insert Job Skills if provided
    if @skills is not null
    begin
        insert into JobSkills(id, job_id, skill_id, created_at, updated_at)
        select newid(), @JobId, value, GETUTCDATE(), GETUTCDATE() from string_split(@skills, ',') where value != ''
    end

    -- Insert Job Tags if provided
    if @tags is not null
    begin
        insert into JobJobTags(id, job_id, job_tag_id, created_at, updated_at)
        select newid(), @JobId, value, GETUTCDATE(), GETUTCDATE() from string_split(@tags, ',') where value != ''
    end

    select * from Jobs where id = @JobId FOR JSON AUTO
end
go
