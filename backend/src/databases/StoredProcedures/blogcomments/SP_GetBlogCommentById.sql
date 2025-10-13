USE JOB_DB;
GO

CREATE OR ALTER PROCEDURE dbo.SP_GetBlogCommentById
    @BlogCommentId NVARCHAR(36)
AS
BEGIN
    SELECT id, content, blog_post_id, user_id, created_at, updated_at
    FROM dbo.BlogComments
    WHERE id = @BlogCommentId;
END;
GO
