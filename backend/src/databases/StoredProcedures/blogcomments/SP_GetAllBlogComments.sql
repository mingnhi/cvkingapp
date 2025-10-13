USE JOB_DB;
GO

CREATE OR ALTER PROCEDURE [dbo].[SP_GetAllBlogComments]
    @BlogPostId NVARCHAR(36) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    SELECT CAST((
        SELECT
            bc.id,
            bc.blog_post_id AS postId,
            bc.user_id AS userId,
            bc.guest_name AS guestName,
            bc.content,
            bc.is_approved AS isApproved,
            bc.created_at AS createdAt,
            bc.updated_at AS updatedAt
        FROM dbo.BlogComments bc
        WHERE (@BlogPostId IS NULL OR bc.blog_post_id = @BlogPostId)
        ORDER BY bc.created_at DESC
        FOR JSON PATH
    ) AS NVARCHAR(MAX)) AS json_result;
END;
GO
