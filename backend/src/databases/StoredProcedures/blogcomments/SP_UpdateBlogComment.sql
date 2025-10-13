USE JOB_DB;
GO

CREATE OR ALTER PROCEDURE dbo.SP_UpdateBlogComment
    @Id UNIQUEIDENTIFIER,
    @Content NVARCHAR(MAX)
AS
BEGIN
    UPDATE BlogComments
    SET content = @Content
    WHERE id = @Id;

    SELECT id, blog_post_id, user_id, guest_name, content, is_approved, created_at, updated_at
    FROM BlogComments WHERE id = @Id;
END;
GO
