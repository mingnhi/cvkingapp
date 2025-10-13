USE JOB_DB;
GO

CREATE OR ALTER PROCEDURE [dbo].[SP_RecordBlogView]
    @BlogPostId INT,
    @UserId INT = NULL,
    @IpAddress NVARCHAR(50) = NULL,
    @UserAgent NVARCHAR(500) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    -- Check if blog post exists
    IF NOT EXISTS (SELECT 1 FROM BlogPosts WHERE id = @BlogPostId)
    BEGIN
        RAISERROR('Blog post not found', 16, 1);
        RETURN;
    END

    DECLARE @SessionId NVARCHAR(200) = 'session_' + CAST(GETUTCDATE() AS NVARCHAR(20)) + '_' + CAST(NEWID() AS NVARCHAR(36));

    INSERT INTO BlogViews (blog_post_id, viewer_user_id, session_id, viewed_at)
    VALUES (@BlogPostId, @UserId, @SessionId, GETUTCDATE());

    SELECT
        bv.id,
        bv.blog_post_id,
        bv.viewer_user_id,
        bv.session_id,
        bv.viewed_at
    FROM BlogViews bv
    WHERE bv.id = SCOPE_IDENTITY()
END
