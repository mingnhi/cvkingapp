USE JOB_DB;
GO

DROP PROCEDURE IF EXISTS dbo.SP_GetBlogViewStats;
GO

CREATE OR ALTER PROCEDURE dbo.SP_GetBlogViewStats
    @BlogPostId NVARCHAR(36)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @TotalViews INT;
    DECLARE @UniqueViews INT;
    DECLARE @RecentViews INT;

    SELECT @TotalViews = views_count
    FROM dbo.BlogPosts
    WHERE id = @BlogPostId;

    SELECT @UniqueViews = COUNT(DISTINCT COALESCE(viewer_user_id, session_id))
    FROM dbo.BlogViews
    WHERE blog_post_id = @BlogPostId;

    SELECT @RecentViews = COUNT(*)
    FROM dbo.BlogViews
    WHERE blog_post_id = @BlogPostId
      AND viewed_at >= DATEADD(HOUR, -24, GETUTCDATE());

    SELECT
        ISNULL(@TotalViews, 0) AS totalViews,
        ISNULL(@UniqueViews, 0) AS uniqueViews,
        ISNULL(@RecentViews, 0) AS recentViews;
END;
GO
