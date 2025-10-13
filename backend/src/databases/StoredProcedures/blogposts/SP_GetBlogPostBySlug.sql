USE JOB_DB;
GO

CREATE OR ALTER PROCEDURE [dbo].[SP_GetBlogPostBySlug]
    @Slug NVARCHAR(500)
AS
BEGIN
    SET NOCOUNT ON;

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
            ) AS tags

        FROM dbo.BlogPosts bp
        WHERE bp.slug = @Slug
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER, INCLUDE_NULL_VALUES
    ) AS NVARCHAR(MAX)) AS json_result;
END;
GO