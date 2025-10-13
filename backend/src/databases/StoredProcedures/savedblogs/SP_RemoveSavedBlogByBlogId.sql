CREATE OR ALTER PROCEDURE [dbo].[SP_RemoveSavedBlogByBlogId]
    @BlogPostId NVARCHAR(36),
    @UserId NVARCHAR(36)
AS
BEGIN
    SET NOCOUNT ON;

    DELETE FROM saved_blogs
    WHERE blog_post_id = @BlogPostId AND user_id = @UserId;

    IF @@ROWCOUNT = 0
    BEGIN
        RAISERROR('Saved blog not found or access denied', 16, 1);
        RETURN;
    END

    SELECT 'Deleted successfully' as message;
END
