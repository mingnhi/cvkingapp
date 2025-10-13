USE JOB_DB;
GO

CREATE OR ALTER PROCEDURE [dbo].[SP_InsertBlogPost]
    @Title NVARCHAR(500),
    @Slug NVARCHAR(500),
    @Content NVARCHAR(MAX),
    @Excerpt NVARCHAR(1000) = NULL,
    @CoverImageUrl NVARCHAR(1000) = NULL,
    @AuthorId UNIQUEIDENTIFIER,
    @CategoryId UNIQUEIDENTIFIER = NULL,
    @IsPublished BIT = 0,
    @PublishedAt DATETIMEOFFSET = NULL,
    @TagIds NVARCHAR(MAX) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRANSACTION;

    DECLARE @NewPostId UNIQUEIDENTIFIER = NEWID();
    DECLARE @Now DATETIMEOFFSET = SYSDATETIMEOFFSET();
    DECLARE @UniqueSlug NVARCHAR(500) = @Slug;
    DECLARE @Counter INT = 1;

    WHILE EXISTS (SELECT 1 FROM dbo.BlogPosts WHERE slug = @UniqueSlug)
    BEGIN
        SET @UniqueSlug = CONCAT(@Slug, '-', CAST(@Counter AS NVARCHAR(10)));
        SET @Counter = @Counter + 1;
        IF @Counter > 1000
        BEGIN
            SELECT CAST('{"error": "Unable to generate unique slug for blog post"}' AS NVARCHAR(MAX)) AS json_result;
            RETURN;
        END
    END

    INSERT INTO dbo.BlogPosts (
        id, title, slug, content, excerpt, cover_image_url,
        author_user_id, category_id, is_published, published_at,
        status, views_count, posted_at, created_at
    )
    VALUES (
        @NewPostId, @Title, @UniqueSlug, @Content, @Excerpt, @CoverImageUrl,
        @AuthorId, @CategoryId, @IsPublished, @PublishedAt,
        'Active', 0, @Now, @Now
    );

    IF @TagIds IS NOT NULL AND LEN(@TagIds) > 0
    BEGIN
        INSERT INTO dbo.BlogPostTags (id, blog_post_id, blog_tag_id, created_at)
        SELECT NEWID(), @NewPostId, TRIM(value), @Now
        FROM STRING_SPLIT(@TagIds, ',');
    END

    COMMIT;
    EXEC SP_GetBlogPostById @NewPostId;
END;
GO
