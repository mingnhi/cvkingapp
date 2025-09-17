use JOB_PORTAL
go

create procedure [dbo].[SP_UpdateJob]
(
    @JobId int,
    @CompanyId int,
    @PostedByUserId int = null,
    @Title nvarchar(300),
    @Slug nvarchar(300),
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
    @ExpiresAt datetime2 = null
)
as
begin
    update Jobs set
        CompanyId = @CompanyId,
        PostedByUserId = @PostedByUserId,
        Title = @Title,
        Slug = @Slug,
        ShortDescription = @ShortDescription,
        Description = @Description,
        Requirements = @Requirements,
        Benefits = @Benefits,
        SalaryMin = @SalaryMin,
        SalaryMax = @SalaryMax,
        Currency = @Currency,
        JobType = @JobType,
        Location = @Location,
        CategoryId = @CategoryId,
        Status = @Status,
        ViewsCount = @ViewsCount,
        PostedAt = @PostedAt,
        ExpiresAt = @ExpiresAt,
        UpdatedAt = SYSUTCDATETIME()
    where JobId = @JobId

    select * from Jobs where JobId = @JobId
end
