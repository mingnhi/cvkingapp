use cvkingapp
go

-- Xóa Job
CREATE PROCEDURE SP_DeleteJob
  @Id UNIQUEIDENTIFIER
AS
BEGIN
  DELETE FROM JobSkills WHERE job_id=@Id;
  DELETE FROM JobJobTags WHERE job_id=@Id;
  DELETE FROM Jobs WHERE id=@Id;
END
GO

