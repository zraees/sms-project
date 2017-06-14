select * from teachers
select * from qualificationtypes
select * from teacherqualifications
select * from countries where name like '%uni%'
--truncate table teacherqualifications

select * from teacherexperiences

select * from states where countryid = 166
select * from cities where stateid = 2729
select * from nationalities

166	PK	Pakistan		92	NULL
191	SA	Saudi Arabia	966	NULL
229	AE	United Arab Emirates	971	NULL

--Update countries set nationality='Pakistani' where countryid=166
--Update countries set nationality='Saudi' where countryid=191
--Update countries set nationality='Emirati' where countryid=229

