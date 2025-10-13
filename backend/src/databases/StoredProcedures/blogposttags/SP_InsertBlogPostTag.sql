USE JOB_DB;
GO

CREATE OR ALTER PROCEDURE dbo.SP_InsertBlogPostTag
    @BlogPostId UNIQUEIDENTIFIER,
    @BlogTagId UNIQUEIDENTIFIER
AS
BEGIN

    INSERT INTO BlogPostTags ([blog_post_id], [blog_tag_id])
    VALUES (@BlogPostId, @BlogTagId);

    SELECT * FROM BlogPostTags WHERE blog_post_id = @BlogPostId AND blog_tag_id = @BlogTagId;

END;
GO
