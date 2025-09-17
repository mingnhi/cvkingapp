USE JOB_DB;
GO

CREATE OR ALTER PROCEDURE dbo.SP_GetAllJob
AS
BEGIN
    SELECT
        j.*,
        (SELECT name FROM JobCategories WHERE id = j.category_id) AS categoryName,
        (
            SELECT s.name
            FROM Skills s
            INNER JOIN JobSkills js ON js.skill_id = s.skill_id
            WHERE js.job_id = j.id
            FOR JSON PATH
        ) AS skills,
        (
            SELECT jt.name
            FROM JobTags jt
            INNER JOIN JobJobTags jjt ON jjt.job_tag_id = jt.id
            WHERE jjt.job_id = j.id
            FOR JSON PATH
        ) AS jobTags
    FROM Jobs j
    FOR JSON AUTO;
END;
GO
