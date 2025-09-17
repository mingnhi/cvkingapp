use JOB_DB
go

create procedure [dbo].[SP_UpdateJob]
(
    @JobId varchar(max),
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
    @ViewsCount int,
    @PostedAt datetime2,
    @ExpiresAt datetime2 = null,
    @skills varchar(max) = null,
    @tags varchar(max) = null
)
as
begin
    update Jobs set
        company_id = @CompanyId,
        posted_by_user_id = @PostedByUserId,
        title = @Title,
        slug = @Slug,
        short_description = @ShortDescription,
        description = @Description,
        requirements = @Requirements,
        benefits = @Benefits,
        salary_min = @SalaryMin,
        salary_max = @SalaryMax,
        currency = @Currency,
        job_type = @JobType,
        location = @Location,
        category_id = @CategoryId,
        status = @Status,
        views_count = @ViewsCount,
        posted_at = @PostedAt,
        expires_at = @ExpiresAt,
        updated_at = SYSUTCDATETIME()
    where id = @JobId

    -- Update Job Skills if provided
    if @skills is not null
    begin
        delete from JobSkills where job_id = @JobId
        insert into JobSkills(id, job_id, skill_id, created_at, updated_at)
        select newid(), @JobId, value, GETUTCDATE(), GETUTCDATE() from string_split(@skills, ',') where value != ''
    end

    -- Update Job Tags if provided
    if @tags is not null
    begin
        delete from JobJobTags where job_id = @JobId
        insert into JobJobTags(id, job_id, job_tag_id, created_at, updated_at)
        select newid(), @JobId, value, GETUTCDATE(), GETUTCDATE() from string_split(@tags, ',') where value != ''
    end

    select * from Jobs where id = @JobId FOR JSON AUTO
end
go
