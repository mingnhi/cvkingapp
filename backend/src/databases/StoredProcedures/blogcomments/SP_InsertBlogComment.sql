USE JOB_DB;
GO

CREATE OR ALTER PROCEDURE [dbo].[SP_InsertBlogComment]
    @Content NVARCHAR(MAX),
    @BlogPostId NVARCHAR(36),
    @UserId NVARCHAR(36) = NULL,
    @GuestName NVARCHAR(200) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    -- Validate that either UserId or GuestName is provided
    IF @UserId IS NULL AND (@GuestName IS NULL OR LEN(@GuestName) = 0)
    BEGIN
        SELECT CAST('{"error": "Either UserId or GuestName must be provided"}' AS NVARCHAR(MAX)) AS json_result;
        RETURN;
    END

    -- Check if blog post exists
    IF NOT EXISTS (SELECT 1 FROM dbo.BlogPosts WHERE id = @BlogPostId)
    BEGIN
        SELECT CAST('{"error": "Blog post not found"}' AS NVARCHAR(MAX)) AS json_result;
        RETURN;
    END

    INSERT INTO dbo.BlogComments (
        blog_post_id, content, user_id, guest_name, is_approved
    )
    VALUES (
        @BlogPostId, @Content, @UserId, @GuestName, 0  -- Comments start as unapproved
    );

    -- Return created comment (find by blog_post_id and recent created_at)
    SELECT CAST((
        SELECT TOP 1
            bc.id,
            bc.blog_post_id AS postId,
            bc.user_id AS userId,
            bc.guest_name AS guestName,
            bc.content,
            bc.is_approved AS isApproved,
            bc.created_at AS createdAt,
            bc.updated_at AS updatedAt
        FROM dbo.BlogComments bc
        WHERE bc.blog_post_id = @BlogPostId
        ORDER BY bc.created_at DESC
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER, INCLUDE_NULL_VALUES
    ) AS NVARCHAR(MAX)) AS json_result;
END;
GO
