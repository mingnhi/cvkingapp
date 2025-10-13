USE JOB_DB;
GO

CREATE OR ALTER PROCEDURE dbo.SP_DeleteBlogComment
    @BlogCommentId UNIQUEIDENTIFIER
AS
BEGIN
    DELETE FROM BlogComments
    WHERE id = @BlogCommentId;

    SELECT @@ROWCOUNT AS rowsAffected;
END;
GO
