USE JOB_DB;
GO

CREATE OR ALTER PROCEDURE [dbo].[SP_UpdateBlogPost]
    @Id UNIQUEIDENTIFIER,
    @Title NVARCHAR(500) = NULL,
    @Slug NVARCHAR(500) = NULL, 
    @Content NVARCHAR(MAX) = NULL,
    @Excerpt NVARCHAR(1000) = NULL,
    @CoverImageUrl NVARCHAR(1000) = NULL,
    @CategoryId UNIQUEIDENTIFIER = NULL,
    @IsPublished BIT = NULL,
    @PublishedAt DATETIMEOFFSET = NULL,
    @TagIds NVARCHAR(MAX) = NULL,
    @Status NVARCHAR(50) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRANSACTION;

    DECLARE @Now DATETIMEOFFSET = SYSDATETIMEOFFSET();
    DECLARE @UniqueSlug NVARCHAR(500);

    IF @Slug IS NOT NULL
    BEGIN
        SET @UniqueSlug = @Slug;
        DECLARE @Counter INT = 1;

        WHILE EXISTS (SELECT 1 FROM dbo.BlogPosts WHERE slug = @UniqueSlug AND id != @Id)
        BEGIN
            SET @UniqueSlug = CONCAT(@Slug, '-', CAST(@Counter AS NVARCHAR(10)));
            SET @Counter = @Counter + 1;
            IF @Counter > 1000
            BEGIN
                SELECT CAST('{"error": "Unable to generate unique slug"}' AS NVARCHAR(MAX));
                RETURN;
            END
        END
    END

    UPDATE dbo.BlogPosts
    SET
        title = COALESCE(@Title, title),
        slug = COALESCE(@UniqueSlug, slug),
        content = COALESCE(@Content, content),
        excerpt = COALESCE(@Excerpt, excerpt),
        cover_image_url = COALESCE(@CoverImageUrl, cover_image_url),
        category_id = COALESCE(@CategoryId, category_id),
        is_published = COALESCE(@IsPublished, is_published),
        published_at = COALESCE(@PublishedAt, published_at),
        status = COALESCE(@Status, status),
        updated_at = @Now
    WHERE id = @Id;

    IF @TagIds IS NOT NULL
    BEGIN
        DELETE FROM dbo.BlogPostTags WHERE blog_post_id = @Id;
        IF LEN(@TagIds) > 0
        BEGIN
            INSERT INTO dbo.BlogPostTags (id, blog_post_id, blog_tag_id, created_at)
            SELECT NEWID(), @Id, TRIM(value), @Now
            FROM STRING_SPLIT(@TagIds, ',');
        END
    END

    COMMIT;
    EXEC SP_GetBlogPostById @Id;
END;
GO
