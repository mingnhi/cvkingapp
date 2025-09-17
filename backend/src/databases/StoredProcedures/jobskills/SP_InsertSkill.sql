USE Job;
GO

CREATE OR ALTER PROCEDURE dbo.SP_InsertSkill
    @Name NVARCHAR(200)
AS
BEGIN
    DECLARE @NewId UNIQUEIDENTIFIER = NEWID();

    insert into Skills(id,name,created_at, updated_at)
    values (@NewId, @Name, SYSDATETIMEOFFSET(),null)

    SELECT * FROM Skills WHERE id = @NewId;
END;
GO
