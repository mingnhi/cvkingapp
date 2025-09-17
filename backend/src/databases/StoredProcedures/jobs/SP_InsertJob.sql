use JOB_PORTAL
go

create procedure [dbo].[SP_InsertJob]
(
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
    @ViewsCount int = 0,
    @PostedAt datetime2 = null,
    @ExpiresAt datetime2 = null
)
as
begin
    insert into Jobs(CompanyId, PostedByUserId, Title, Slug, ShortDescription, Description, Requirements, Benefits, SalaryMin, SalaryMax, Currency, JobType, Location, CategoryId, Status, ViewsCount, PostedAt, ExpiresAt)
    values (@CompanyId, @PostedByUserId, @Title, @Slug, @ShortDescription, @Description, @Requirements, @Benefits, @SalaryMin, @SalaryMax, @Currency, @JobType, @Location, @CategoryId, @Status, @ViewsCount, ISNULL(@PostedAt, SYSUTCDATETIME()), @ExpiresAt)

    declare @JobId int = SCOPE_IDENTITY()

    select * from Jobs where JobId = @JobId
end
