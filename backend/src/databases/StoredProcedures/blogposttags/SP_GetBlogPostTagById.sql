USE JOB_DB;
GO

CREATE OR ALTER PROCEDURE dbo.SP_GetBlogPostTagById
    @BlogPostTagId NVARCHAR(36)
AS
BEGIN
    SELECT id, blog_post_id, blog_tag_id
    FROM dbo.BlogPostTags
    WHERE id = @BlogPostTagId;
END;
GO
