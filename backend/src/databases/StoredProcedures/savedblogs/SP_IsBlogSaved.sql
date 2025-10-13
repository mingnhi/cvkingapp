CREATE OR ALTER PROCEDURE [dbo].[SP_IsBlogSaved]
    @BlogPostId NVARCHAR(36),
    @UserId NVARCHAR(36)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        CASE WHEN EXISTS(
            SELECT 1 FROM saved_blogs
            WHERE blog_post_id = @BlogPostId AND user_id = @UserId
        ) THEN 1 ELSE 0 END as isSaved
END
