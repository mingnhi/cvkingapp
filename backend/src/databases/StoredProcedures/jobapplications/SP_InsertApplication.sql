use cvkingapp
go

-- 📌 Thêm application mới
CREATE OR ALTER PROCEDURE SP_InsertJobApplication
  @JobId UNIQUEIDENTIFIER,
  @JobSeekerId UNIQUEIDENTIFIER,
  @CoverLetter NVARCHAR(MAX) = NULL
AS
BEGIN
  SET NOCOUNT ON;

  DECLARE @NewId UNIQUEIDENTIFIER = NEWID();

  INSERT INTO job_applications (
    id, job_id, job_seeker_id, cover_letter, status,
    applied_at, is_deleted, created_at
  )
  VALUES (
    @NewId, @JobId, @JobSeekerId, @CoverLetter, 'Pending',
    GETDATE(), 0, GETDATE()
  );

  EXEC SP_GetJobApplicationById @NewId;
END
GO
