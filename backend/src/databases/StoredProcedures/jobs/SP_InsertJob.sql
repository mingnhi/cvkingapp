use JOB_PORTAL
go

create procedure [dbo].[SP_InsertJob]
(
    @CompanyId int,
    @PostedByUserId int,
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
    insert into Jobs 
        (CompanyId, PostedByUserId, Title, Slug, ShortDescription, Description, Requirements, Benefits,
         SalaryMin, SalaryMax, Currency, JobType, Location, CategoryId, Status, ViewsCount, PostedAt, ExpiresAt, CreatedAt)
    values 
        (@CompanyId, @PostedByUserId, @Title, @Slug, @ShortDescription, @Description, @Requirements, @Benefits,
         @SalaryMin, @SalaryMax, @Currency, @JobType, @Location, @CategoryId, @Status, 0, SYSDATETIMEOFFSET(), @ExpiresAt, SYSDATETIMEOFFSET());

    SELECT * FROM Jobs WHERE JobId = SCOPE_IDENTITY();
end
