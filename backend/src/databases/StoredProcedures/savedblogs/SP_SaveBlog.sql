CREATE OR ALTER PROCEDURE [dbo].[SP_SaveBlog]
    @BlogPostId NVARCHAR(36),
    @UserId NVARCHAR(36)
AS
BEGIN
    SET NOCOUNT ON;

    -- Check if blog post exists
    IF NOT EXISTS (SELECT 1 FROM BlogPosts WHERE id = @BlogPostId)
    BEGIN
        RAISERROR('Blog post not found', 16, 1);
        RETURN;
    END

    -- Check if already saved
    IF EXISTS (SELECT 1 FROM saved_blogs WHERE blog_post_id = @BlogPostId AND user_id = @UserId)
    BEGIN
        RAISERROR('Blog is already saved', 16, 1);
        RETURN;
    END

    INSERT INTO saved_blogs (blog_post_id, user_id)
    VALUES (@BlogPostId, @UserId);

    SELECT
        sb.id,
        sb.blog_post_id,
        sb.user_id,
        sb.created_at,
        bp.title,
        bp.slug,
        bp.excerpt,
        bp.cover_image_url,
        u.displayName as authorName
    FROM saved_blogs sb
    INNER JOIN BlogPosts bp ON sb.blog_post_id = bp.id
    LEFT JOIN Users u ON bp.author_user_id = u.id
    WHERE sb.blog_post_id = @BlogPostId AND sb.user_id = @UserId
END
