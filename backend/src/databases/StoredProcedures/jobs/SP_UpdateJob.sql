use JOB_PORTAL
go

create procedure [dbo].[SP_UpdateJob]
(
    @JobId int,
    @CompanyId int,
    @Title NVARCHAR(300),
    @Slug NVARCHAR(300),
    @ShortDescription NVARCHAR(1000),
    @Description NVARCHAR(MAX),
    @Requirements NVARCHAR(MAX),
    @Benefits NVARCHAR(MAX),
    @SalaryMin int,
    @SalaryMax int,
    @Currency NVARCHAR(10),
    @JobType NVARCHAR(50),
    @Location NVARCHAR(300),
    @CategoryId int,
    @Status NVARCHAR(50),
    @ExpiresAt DATETIME2
)
as
begin
    update Jobs
        set CompanyId = @CompanyId, Title = @Title, Slug = @Slug, ShortDescription = @ShortDescription,
            Description = @Description, Requirements = @Requirements, Benefits = @Benefits,
            SalaryMin = @SalaryMin, SalaryMax = @SalaryMax, Currency = @Currency, JobType = @JobType,
            Location = @Location, CategoryId = @CategoryId, Status = @Status,
            ExpiresAt = @ExpiresAt, UpdatedAt = SYSDATETIMEOFFSET()
    where JobId = @JobId
end
