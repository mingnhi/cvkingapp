USE JOB_DB;
GO

CREATE OR ALTER PROCEDURE [dbo].[SP_SetBlogCommentApproval]
    @Id UNIQUEIDENTIFIER,
    @IsApproved BIT
AS
BEGIN
    SET NOCOUNT ON;

    -- Check if comment exists
    IF NOT EXISTS (SELECT 1 FROM dbo.BlogComments WHERE id = @Id)
    BEGIN
        SELECT CAST('{"error": "Blog comment not found"}' AS NVARCHAR(MAX)) AS json_result;
        RETURN;
    END

    -- Update approval status
    UPDATE dbo.BlogComments
    SET is_approved = @IsApproved
    WHERE id = @Id;

    -- Return updated comment
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
        WHERE bc.id = @Id
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER, INCLUDE_NULL_VALUES
    ) AS NVARCHAR(MAX)) AS json_result;
END;
GO
