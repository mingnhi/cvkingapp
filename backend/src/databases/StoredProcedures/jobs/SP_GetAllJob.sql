use JOB_PORTAL
go

create procedure [dbo].[SP_GetAllJob]
as
begin
    select
        j.*,
        (select name from Companies where id = j.CompanyId) as companyName,
        (select name from Users where id = j.PostedByUserId) as postedByUserName,
        (select name from JobCategories where JobCategoryId = j.CategoryId) as categoryName,
        (select count(*) from JobViews where jobId = j.JobId) as viewCount,
        (
            select s.Name + ','
            from Skills s
            inner join JobSkills js on js.SkillId = s.SkillId
            where js.JobId = j.JobId
            for xml path('')
        ) as skills,
        (
            select jt.Name + ','
            from JobTags jt
            inner join JobJobTags jjt on jjt.JobTagId = jt.JobTagId
            where jjt.JobId = j.JobId
            for xml path('')
        ) as jobTags
    from Jobs j
end
