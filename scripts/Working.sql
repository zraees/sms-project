use sms

select * from students order by studentid desc
select * from StudentsClasses
select * from NLog order by id desc

select * from ClassesSections
select * from teachersSubjects
select * from shifts
select * from sections
select * from classes
select * from students 
select * from Batches
select * from Languages
select * from Religions

--delete dbo.TeacherExperiences
--delete dbo.TeacherQualifications
--delete dbo.TeachersClasses
--delete dbo.TeachersSubjects
--delete Teachers
--delete ClassesSections
--select * from shifts
--select * from sections
--select * from classes
--select * from students 
--select * from Batches
--select * from Languages
--select * from Religions

select * from Countries where Nationality is not null
select * from States where CountryId in (166, 191, 229) and IsActive = 1
SELect * from Cities where StateId in (select StateId from States where CountryId in (166) and IsActive = 1)

--DELETE Countries where Nationality IS NULL
--DELETE States where CountryId  in ( 191, 229) 
--DELETE Cities where StateId  in (select StateId from States where CountryId in ( 191, 229))

--SELECT * INTO Countries_BK FROM Countries
--SELECT * INTO States_BK FROM States
--SELECT * INTO Cities_BK FROM Cities

SELECT MAX(RIGHT(Code, 5)) as Code FROM Students 
	WHERE YEAR(CreatedOn) = 2017 AND  MONTH(CreatedOn) = 8 AND  Day(CreatedOn) = 9
	