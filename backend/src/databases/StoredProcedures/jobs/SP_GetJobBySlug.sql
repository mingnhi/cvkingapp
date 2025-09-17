use JOB_PORTAL
go

create procedure [dbo].[SP_GetJobBySlug]
(
    @slug nvarchar(300)
)
as
begin
    select (
        select
            j.*,
            (select name from Companies where id = j.CompanyId) as companyName,
            (select name from Users where id = j.PostedByUserId) as postedByUserName,
            (select count(*) from JobViews where jobId = j.JobId) as viewCount,
            (
                select
                    jt.JobTagId as id,
                    jt.Name as name
                from JobTags jt
                inner join JobJobTags jjt on jjt.JobTagId = jt.JobTagId
                where jjt.JobId = j.JobId
                for json path
            ) as tags,
            (
                select
                    s.SkillId as id,
                    s.Name as name
                from Skills s
                inner join JobSkills js on js.SkillId = s.SkillId
                where js.JobId = j.JobId
                for json path
            ) as skills
        from Jobs j
        where j.Slug = @slug
        for json path, without_array_wrapper
    ) as jobDetail
end
