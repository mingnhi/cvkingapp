USE Job;
GO

CREATE OR ALTER PROCEDURE dbo.SP_GetAllJobTags
AS
BEGIN
    SELECT *
    FROM dbo.JobTags
    
END;
GO
