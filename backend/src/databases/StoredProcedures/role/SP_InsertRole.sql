use JOB_PORTAL
go

create procedure [dbo].[SP_InsertRole]
(
    @Name varchar(max),
    @Description nvarchar(max)
)
as
begin
    DECLARE @NewId UNIQUEIDENTIFIER = NEWID();

    insert into Roles(id,name,description,created_at, updated_at)
    values (@NewId, @Name, @Description, SYSDATETIMEOFFSET(),null)

    SELECT * FROM Roles WHERE Id = @NewId;
end
