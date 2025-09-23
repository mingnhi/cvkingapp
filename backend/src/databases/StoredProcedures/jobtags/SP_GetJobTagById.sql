USE Job;
GO

CREATE OR ALTER PROCEDURE dbo.SP_GetJobTagById
    @JobTagId NVARCHAR(36)
AS
BEGIN
    SELECT id, Name
    FROM dbo.JobTags
    WHERE id = @JobTagId;
END;
GO
