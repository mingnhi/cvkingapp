USE JOB_DB;
GO

-- Lấy toàn bộ job + quan hệ
CREATE PROCEDURE SP_GetAllJobs AS
SELECT 
  j.*,
  (
    SELECT jc.id, jc.Name
    FROM JobCategories jc
    WHERE jc.id = j.category_id
    FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
  ) AS category,
  (
    SELECT s.id, s.Name
    FROM JobSkills js
    JOIN Skills s ON s.id = js.skill_id
    WHERE js.job_id = j.id
    FOR JSON PATH
  ) AS skills,
  (
    SELECT t.id, t.Name
    FROM JobJobTags jjt
    JOIN JobTags t ON t.id = jjt.job_tag_id
    WHERE jjt.job_id = j.id
    FOR JSON PATH
  ) AS tags
FROM Jobs j
FOR JSON PATH;
GO
