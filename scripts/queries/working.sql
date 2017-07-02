use sms
select * from [NLog]
select * from errors

delete errors
delete nlog

SELECT * FROM sys.messages WHERE language_id = 1033 and message_id =2601 --547--201 --53	--2627

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

Method: GET, 
RequestUri: 'http://localhost:8082/api/teachers', Version: 1.1, Content: System.Web.Http.WebHost.HttpControllerHandler+LazyStreamContent, 
Headers:  {    Cache-Control: no-cache    Connection: keep-alive    Accept: */*    Accept-Encoding: gzip    Accept-Encoding: deflate    Accept-Encoding: sdch    Accept-Encoding: br    Accept-Language: en-US    Accept-Language: en; q=0.8    Host: localhost:8082    User-Agent: Mozilla/5.0    User-Agent: (Windows NT 6.3; Win64; x64)    User-Agent: AppleWebKit/537.36    User-Agent: (KHTML, like Gecko)    User-Agent: Chrome/58.0.3029.110    User-Agent: Safari/537.36    Postman-Token: 165cc9bc-d7ca-cd57-81c6-8fa465f48aad    Content-Type: application/json  }