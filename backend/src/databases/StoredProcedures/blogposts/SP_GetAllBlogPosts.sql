USE JOB_DB;
GO

CREATE OR ALTER PROCEDURE [dbo].[SP_GetAllBlogPosts]
    @Page INT = 1,
    @PageSize INT = 10,
    @AuthorUserId UNIQUEIDENTIFIER = NULL,
    @IsPublished BIT = NULL,
    @Keyword NVARCHAR(500) = NULL,
    @TagId UNIQUEIDENTIFIER = NULL
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @Offset INT = (@Page - 1) * @PageSize;

    SELECT CAST((
        SELECT 
            bp.id, bp.title, bp.slug, bp.excerpt, bp.cover_image_url,
            bp.author_user_id, bp.category_id, bp.is_published, bp.published_at,
            bp.created_at, bp.updated_at, bp.status, bp.views_count, bp.posted_at,
            bp.expires_at, bp.short_description,
            -- Remove bp.content from here to avoid GROUP BY issues

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
        LEFT JOIN dbo.BlogPostTags bpt ON bp.id = bpt.blog_post_id
        WHERE (@AuthorUserId IS NULL OR bp.author_user_id = @AuthorUserId)
          AND (@IsPublished IS NULL OR bp.is_published = @IsPublished)
          AND (@Keyword IS NULL OR bp.title LIKE '%' + @Keyword + '%' OR bp.excerpt LIKE '%' + @Keyword + '%')
          AND (@TagId IS NULL OR bpt.blog_tag_id = @TagId)
        GROUP BY bp.id, bp.title, bp.slug, bp.excerpt, bp.cover_image_url,
                 bp.author_user_id, bp.is_published, bp.published_at, bp.created_at, bp.updated_at,
                 bp.status, bp.views_count, bp.posted_at, bp.expires_at, bp.short_description,
                 bp.category_id
                 -- Remove bp.content from GROUP BY
        ORDER BY bp.created_at DESC
        OFFSET @Offset ROWS
        FETCH NEXT @PageSize ROWS ONLY
        FOR JSON PATH, INCLUDE_NULL_VALUES
    ) AS NVARCHAR(MAX)) AS json_result;
END;
GO
