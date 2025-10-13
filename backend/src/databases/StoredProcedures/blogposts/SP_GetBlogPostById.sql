USE JOB_DB;
GO

CREATE OR ALTER PROCEDURE [dbo].[SP_GetBlogPostById]
    @BlogPostId UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;

    -- Return the blog post data as properly formatted JSON
    SELECT CAST((
        SELECT
            bp.id, bp.title, bp.slug, bp.content, bp.excerpt, bp.cover_image_url,
            bp.author_user_id, bp.category_id, bp.is_published, bp.published_at,
            bp.created_at, bp.updated_at, bp.status, bp.views_count, bp.posted_at,
            bp.expires_at, bp.short_description,

            (
                SELECT bc.id, bc.Name
                FROM BlogCategories bc
                WHERE bc.id = bp.category_id
                FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
            ) AS category,

            (
                SELECT bt.id, bt.Name
                FROM BlogTags bt
                JOIN BlogPostTags bpt ON bt.id = bpt.blog_tag_id
                WHERE bpt.blog_post_id = bp.id
                FOR JSON PATH
            ) AS tags,

            (
                SELECT
                    bc.id, bc.content, bc.user_id, bc.guest_name,
                    bc.is_approved, bc.created_at
                FROM BlogComments bc
                WHERE bc.blog_post_id = bp.id AND bc.is_approved = 1
                ORDER BY bc.created_at DESC
                FOR JSON PATH
            ) AS comments

        FROM dbo.BlogPosts bp
        WHERE bp.id = @BlogPostId
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER, INCLUDE_NULL_VALUES
    ) AS NVARCHAR(MAX)) AS json_result;
END;
GO
