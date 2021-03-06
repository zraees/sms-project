USE [SMS]
GO
/****** Object:  Table [dbo].[NLog]    Script Date: 07/23/2017 18:35:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[NLog](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[MachineName] [nvarchar](200) NULL,
	[SiteName] [nvarchar](200) NOT NULL,
	[Logged] [datetime] NOT NULL,
	[Level] [varchar](5) NOT NULL,
	[UserName] [nvarchar](200) NULL,
	[Message] [nvarchar](max) NOT NULL,
	[Logger] [nvarchar](300) NULL,
	[Properties] [nvarchar](max) NULL,
	[ServerName] [nvarchar](200) NULL,
	[Port] [nvarchar](100) NULL,
	[Url] [nvarchar](2000) NULL,
	[Https] [bit] NULL,
	[ServerAddress] [nvarchar](100) NULL,
	[RemoteAddress] [nvarchar](100) NULL,
	[Callsite] [nvarchar](300) NULL,
	[Exception] [nvarchar](max) NULL,
 CONSTRAINT [PK_dbo.Log] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Locations]    Script Date: 07/23/2017 18:35:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Locations](
	[LocationID] [int] NOT NULL,
 CONSTRAINT [PK_Locations] PRIMARY KEY CLUSTERED 
(
	[LocationID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Languages]    Script Date: 07/23/2017 18:35:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Languages](
	[LangId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Symbol] [nvarchar](10) NOT NULL,
 CONSTRAINT [PK_Languages] PRIMARY KEY CLUSTERED 
(
	[LangId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[FeeTypes]    Script Date: 07/23/2017 18:35:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FeeTypes](
	[FeeTypeID] [int] NOT NULL,
 CONSTRAINT [PK_FeeTypes] PRIMARY KEY CLUSTERED 
(
	[FeeTypeID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Errors]    Script Date: 07/23/2017 18:35:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Errors](
	[ErrorId] [int] IDENTITY(1,1) NOT NULL,
	[Query] [nvarchar](max) NULL,
	[Parameters] [nvarchar](max) NULL,
	[CommandType] [nvarchar](50) NULL,
	[TotalSeconds] [decimal](6, 2) NULL,
	[Exception] [nvarchar](max) NULL,
	[InnerException] [nvarchar](max) NULL,
	[RequestId] [int] NULL,
	[FileName] [nvarchar](255) NULL,
	[CreateDate] [datetime] NULL,
	[Active] [bit] NULL,
 CONSTRAINT [PK_Errors] PRIMARY KEY CLUSTERED 
(
	[ErrorId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DiscountTypes]    Script Date: 07/23/2017 18:35:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DiscountTypes](
	[DiscountTypeID] [int] NOT NULL,
 CONSTRAINT [PK_DiscountTypes] PRIMARY KEY CLUSTERED 
(
	[DiscountTypeID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Days]    Script Date: 07/23/2017 18:35:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Days](
	[DayID] [int] NOT NULL,
	[DayName] [nvarchar](50) NOT NULL,
	[IsWeekend] [int] NOT NULL,
 CONSTRAINT [PK_Days] PRIMARY KEY CLUSTERED 
(
	[DayID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Classes]    Script Date: 07/23/2017 18:35:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Classes](
	[ClassID] [int] NOT NULL,
 CONSTRAINT [PK_Classes] PRIMARY KEY CLUSTERED 
(
	[ClassID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ShiftTypes]    Script Date: 07/23/2017 18:35:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ShiftTypes](
	[ShiftTypeID] [int] NOT NULL,
 CONSTRAINT [PK_ShiftTypes] PRIMARY KEY CLUSTERED 
(
	[ShiftTypeID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Sections]    Script Date: 07/23/2017 18:35:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sections](
	[SectionID] [int] NOT NULL,
 CONSTRAINT [PK_Sections] PRIMARY KEY CLUSTERED 
(
	[SectionID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Religions]    Script Date: 07/23/2017 18:35:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Religions](
	[ReligionId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_Religions] PRIMARY KEY CLUSTERED 
(
	[ReligionId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[QualificationTypes]    Script Date: 07/23/2017 18:35:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[QualificationTypes](
	[QualificationTypeId] [int] NOT NULL,
	[QualificationType] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_QualificationTypes] PRIMARY KEY CLUSTERED 
(
	[QualificationTypeId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Parents]    Script Date: 07/23/2017 18:35:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Parents](
	[ParentID] [int] NOT NULL,
 CONSTRAINT [PK_Parents] PRIMARY KEY CLUSTERED 
(
	[ParentID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SubjectTypes]    Script Date: 07/23/2017 18:35:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SubjectTypes](
	[SubjectTypeID] [int] NOT NULL,
 CONSTRAINT [PK_SubjectTypes] PRIMARY KEY CLUSTERED 
(
	[SubjectTypeID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Teachers]    Script Date: 07/23/2017 18:35:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Teachers](
	[TeacherId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](150) NOT NULL,
	[Email] [nvarchar](150) NULL,
	[DOB] [smalldatetime] NULL,
	[IDNo] [nvarchar](50) NULL,
	[Gender] [nvarchar](6) NULL,
	[Rating] [int] NULL,
	[Address] [nvarchar](500) NULL,
	[PhoneNo] [nvarchar](30) NULL,
	[MobileNo] [nvarchar](30) NULL,
	[CountryId] [int] NULL,
	[StateId] [int] NULL,
	[CityId] [int] NULL,
	[NationalityId] [int] NULL,
 CONSTRAINT [PK_Teachers] PRIMARY KEY CLUSTERED 
(
	[TeacherId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[States]    Script Date: 07/23/2017 18:35:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[States](
	[StateId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[CountryId] [int] NOT NULL,
 CONSTRAINT [PK_States] PRIMARY KEY CLUSTERED 
(
	[StateId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Subjects]    Script Date: 07/23/2017 18:35:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Subjects](
	[SubjectID] [int] NOT NULL,
	[SubjectTypeID] [int] NOT NULL,
 CONSTRAINT [PK_Subjects] PRIMARY KEY CLUSTERED 
(
	[SubjectID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Students]    Script Date: 07/23/2017 18:35:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Students](
	[StudentID] [int] IDENTITY(1,1) NOT NULL,
	[Code] [nvarchar](20) NULL,
	[Name1] [nvarchar](50) NOT NULL,
	[Name2] [nvarchar](50) NULL,
	[Name3] [nvarchar](50) NULL,
	[Name4] [nvarchar](50) NULL,
	[FullName] [nvarchar](210) NOT NULL,
	[NameAr1] [nvarchar](50) NOT NULL,
	[NameAr2] [nvarchar](50) NULL,
	[NameAr3] [nvarchar](50) NULL,
	[NameAr4] [nvarchar](50) NULL,
	[FullNameAr] [nvarchar](210) NOT NULL,
	[DOB] [datetime] NULL,
	[FullNamePassport] [nvarchar](250) NOT NULL,
	[FullNameArPassport] [nvarchar](250) NOT NULL,
	[FatherIDNo] [nvarchar](20) NULL,
	[StudentIDNo] [nvarchar](20) NULL,
	[PlaceOfBirth] [nvarchar](50) NULL,
	[NationalityId] [int] NULL,
	[Email] [nvarchar](150) NULL,
	[Gender] [nvarchar](6) NULL,
	[Lang1ID] [int] NULL,
	[Lang2Id] [int] NULL,
	[ReligionId] [int] NULL,
	[PhoneNo] [nvarchar](30) NULL,
	[MobileNo] [nvarchar](30) NULL,
	[StudentStayWith] [nvarchar](50) NULL,
	[HasSameSchoolAttendedBefore] [bit] NULL,
	[SchoolAttendedStartDate] [datetime] NULL,
	[SchoolAttendedEndDate] [datetime] NULL,
	[HasStudentEverSkippedGrade] [bit] NULL,
	[SkippedGrades] [nvarchar](50) NULL,
	[HasStudentRepeatGrade] [bit] NULL,
	[RepeatGrades] [nvarchar](50) NULL,
 CONSTRAINT [PK_Students] PRIMARY KEY CLUSTERED 
(
	[StudentID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  StoredProcedure [dbo].[NLog_AddEntry_p]    Script Date: 07/23/2017 18:35:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[NLog_AddEntry_p] (
  @machineName nvarchar(200),
  @siteName nvarchar(200),
  @logged datetime,
  @level varchar(5),
  @userName nvarchar(200),
  @message nvarchar(max),
  @logger nvarchar(300),
  @properties nvarchar(max),
  @serverName nvarchar(200),
  @port nvarchar(100),
  @url nvarchar(2000),
  @https bit,
  @serverAddress nvarchar(100),
  @remoteAddress nvarchar(100),
  @callSite nvarchar(300),
  @exception nvarchar(max)
) AS
BEGIN
  INSERT INTO [dbo].[NLog] (
    [MachineName],
    [SiteName],
    [Logged],
    [Level],
    [UserName],
    [Message],
    [Logger],
    [Properties],
    [ServerName],
    [Port],
    [Url],
    [Https],
    [ServerAddress],
    [RemoteAddress],
    [CallSite],
    [Exception]
  ) VALUES (
    @machineName,
    @siteName,
    @logged,
    @level,
    @userName,
    @message,
    @logger,
    @properties,
    @serverName,
    @port,
    @url,
    @https,
    @serverAddress,
    @remoteAddress,
    @callSite,
    @exception
  );
END
GO
/****** Object:  Table [dbo].[Shifts]    Script Date: 07/23/2017 18:35:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Shifts](
	[ShiftID] [int] NOT NULL,
	[ShiftTypeID] [int] NOT NULL,
 CONSTRAINT [PK_Shifts] PRIMARY KEY CLUSTERED 
(
	[ShiftID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Admissions]    Script Date: 07/23/2017 18:35:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Admissions](
	[AdmissionID] [int] NOT NULL,
	[StudentID] [int] NOT NULL,
	[Date] [datetime] NULL,
 CONSTRAINT [PK_Admissions] PRIMARY KEY CLUSTERED 
(
	[AdmissionID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ClassesSections]    Script Date: 07/23/2017 18:35:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ClassesSections](
	[ClassSectionID] [int] NOT NULL,
	[ClassID] [int] NULL,
	[ShiftID] [int] NOT NULL,
	[SectionID] [int] NULL,
 CONSTRAINT [PK_ClassesSections] PRIMARY KEY CLUSTERED 
(
	[ClassSectionID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[StudentParent]    Script Date: 07/23/2017 18:35:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[StudentParent](
	[StudentID] [int] NOT NULL,
	[ParentID] [int] NOT NULL,
 CONSTRAINT [PK_StudentParent] PRIMARY KEY CLUSTERED 
(
	[StudentID] ASC,
	[ParentID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TeachersSubjects]    Script Date: 07/23/2017 18:35:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TeachersSubjects](
	[TeacherSubjectID] [int] NOT NULL,
	[TeacherID] [int] NOT NULL,
	[SubjectID] [int] NOT NULL,
 CONSTRAINT [PK_TeachersSubjects] PRIMARY KEY CLUSTERED 
(
	[TeacherSubjectID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TeacherQualifications]    Script Date: 07/23/2017 18:35:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TeacherQualifications](
	[TeacherQualificationId] [int] IDENTITY(1,1) NOT NULL,
	[TeacherId] [int] NOT NULL,
	[Qualification] [nvarchar](150) NOT NULL,
	[InstitutionName] [nvarchar](150) NULL,
	[StartDate] [date] NULL,
	[EndDate] [date] NULL,
	[QualificationTypeId] [int] NULL,
	[ScoreType] [nvarchar](10) NULL,
	[Score] [numeric](6, 2) NULL,
	[Duration] [nvarchar](20) NULL,
	[Majors] [nvarchar](500) NULL,
 CONSTRAINT [PK_TeacherQualifications] PRIMARY KEY CLUSTERED 
(
	[TeacherQualificationId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TeacherExperiences]    Script Date: 07/23/2017 18:35:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TeacherExperiences](
	[TeacherExperienceId] [int] IDENTITY(1,1) NOT NULL,
	[TeacherId] [int] NOT NULL,
	[CompanyName] [nvarchar](150) NOT NULL,
	[StartDate] [date] NULL,
	[EndDate] [date] NULL,
	[TotalExperience] [nvarchar](20) NULL,
	[Designation] [nvarchar](50) NULL,
	[CountryId] [int] NULL,
	[StateId] [int] NULL,
	[CityId] [int] NULL,
	[LeavingReason] [nvarchar](500) NULL,
 CONSTRAINT [PK_TeacherExperiences] PRIMARY KEY CLUSTERED 
(
	[TeacherExperienceId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[StudentsClasses]    Script Date: 07/23/2017 18:35:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[StudentsClasses](
	[StudentClassID] [int] NOT NULL,
	[StudentID] [int] NOT NULL,
	[ClassSectionID] [int] NOT NULL,
	[BatchID] [int] NOT NULL,
 CONSTRAINT [PK_StudentsClasses] PRIMARY KEY CLUSTERED 
(
	[StudentClassID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[FeeStructures]    Script Date: 07/23/2017 18:35:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FeeStructures](
	[FeeStructureID] [int] NOT NULL,
	[ClassSectionID] [int] NOT NULL,
 CONSTRAINT [PK_FeeStructures] PRIMARY KEY CLUSTERED 
(
	[FeeStructureID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[FeeStructureDetails]    Script Date: 07/23/2017 18:35:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FeeStructureDetails](
	[FeeStructureDetailID] [int] NOT NULL,
	[FeeStructureID] [int] NOT NULL,
	[FeeTypeID] [int] NOT NULL,
	[Fee] [decimal](18, 2) NOT NULL,
	[DueOn] [date] NOT NULL,
	[DiscountTypeID] [int] NULL,
	[Discount] [decimal](18, 2) NULL,
 CONSTRAINT [PK_FeeStructureDetails] PRIMARY KEY CLUSTERED 
(
	[FeeStructureDetailID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TimeTable]    Script Date: 07/23/2017 18:35:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TimeTable](
	[TimeTableID] [int] NOT NULL,
	[StudentClassID] [int] NOT NULL,
 CONSTRAINT [PK_TimeTable] PRIMARY KEY CLUSTERED 
(
	[TimeTableID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TimeTableDetails]    Script Date: 07/23/2017 18:35:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TimeTableDetails](
	[TimeTableDetailID] [int] NOT NULL,
	[TimeTableID] [int] NOT NULL,
	[LocationID] [int] NOT NULL,
	[TeacherSubjectID] [int] NOT NULL,
	[DayID] [int] NOT NULL,
	[StartTime] [time](7) NOT NULL,
	[EndTime] [time](7) NOT NULL,
 CONSTRAINT [PK_TimeTableDetails] PRIMARY KEY CLUSTERED 
(
	[TimeTableDetailID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Default [DF_Students_FullName]    Script Date: 07/23/2017 18:35:49 ******/
ALTER TABLE [dbo].[Students] ADD  CONSTRAINT [DF_Students_FullName]  DEFAULT (N'Name1 + '' '' + isnull(name2, '') + '' '' + isnull(name3, '') + '' '' + isnull(name4, '')') FOR [FullName]
GO
/****** Object:  Default [DF_Students_FullNameAr]    Script Date: 07/23/2017 18:35:49 ******/
ALTER TABLE [dbo].[Students] ADD  CONSTRAINT [DF_Students_FullNameAr]  DEFAULT (N'NameAr1 + '' '' + isnull(nameAr2, '') + '' '' + isnull(nameAr3, '') + '' '' + isnull(nameAr4, '')') FOR [FullNameAr]
GO
/****** Object:  ForeignKey [FK_Admissions_Students]    Script Date: 07/23/2017 18:35:49 ******/
ALTER TABLE [dbo].[Admissions]  WITH CHECK ADD  CONSTRAINT [FK_Admissions_Students] FOREIGN KEY([StudentID])
REFERENCES [dbo].[Students] ([StudentID])
GO
ALTER TABLE [dbo].[Admissions] CHECK CONSTRAINT [FK_Admissions_Students]
GO
/****** Object:  ForeignKey [FK_ClassesSections_Classes]    Script Date: 07/23/2017 18:35:49 ******/
ALTER TABLE [dbo].[ClassesSections]  WITH CHECK ADD  CONSTRAINT [FK_ClassesSections_Classes] FOREIGN KEY([ClassID])
REFERENCES [dbo].[Classes] ([ClassID])
GO
ALTER TABLE [dbo].[ClassesSections] CHECK CONSTRAINT [FK_ClassesSections_Classes]
GO
/****** Object:  ForeignKey [FK_ClassesSections_Sections]    Script Date: 07/23/2017 18:35:49 ******/
ALTER TABLE [dbo].[ClassesSections]  WITH CHECK ADD  CONSTRAINT [FK_ClassesSections_Sections] FOREIGN KEY([SectionID])
REFERENCES [dbo].[Sections] ([SectionID])
GO
ALTER TABLE [dbo].[ClassesSections] CHECK CONSTRAINT [FK_ClassesSections_Sections]
GO
/****** Object:  ForeignKey [FK_ClassesSections_Shifts]    Script Date: 07/23/2017 18:35:49 ******/
ALTER TABLE [dbo].[ClassesSections]  WITH CHECK ADD  CONSTRAINT [FK_ClassesSections_Shifts] FOREIGN KEY([ShiftID])
REFERENCES [dbo].[Shifts] ([ShiftID])
GO
ALTER TABLE [dbo].[ClassesSections] CHECK CONSTRAINT [FK_ClassesSections_Shifts]
GO
/****** Object:  ForeignKey [FK_FeeStructureDetails_DiscountTypes]    Script Date: 07/23/2017 18:35:49 ******/
ALTER TABLE [dbo].[FeeStructureDetails]  WITH CHECK ADD  CONSTRAINT [FK_FeeStructureDetails_DiscountTypes] FOREIGN KEY([DiscountTypeID])
REFERENCES [dbo].[DiscountTypes] ([DiscountTypeID])
GO
ALTER TABLE [dbo].[FeeStructureDetails] CHECK CONSTRAINT [FK_FeeStructureDetails_DiscountTypes]
GO
/****** Object:  ForeignKey [FK_FeeStructureDetails_FeeStructures]    Script Date: 07/23/2017 18:35:49 ******/
ALTER TABLE [dbo].[FeeStructureDetails]  WITH CHECK ADD  CONSTRAINT [FK_FeeStructureDetails_FeeStructures] FOREIGN KEY([FeeStructureID])
REFERENCES [dbo].[FeeStructures] ([FeeStructureID])
GO
ALTER TABLE [dbo].[FeeStructureDetails] CHECK CONSTRAINT [FK_FeeStructureDetails_FeeStructures]
GO
/****** Object:  ForeignKey [FK_FeeStructureDetails_FeeTypes]    Script Date: 07/23/2017 18:35:49 ******/
ALTER TABLE [dbo].[FeeStructureDetails]  WITH CHECK ADD  CONSTRAINT [FK_FeeStructureDetails_FeeTypes] FOREIGN KEY([FeeTypeID])
REFERENCES [dbo].[FeeTypes] ([FeeTypeID])
GO
ALTER TABLE [dbo].[FeeStructureDetails] CHECK CONSTRAINT [FK_FeeStructureDetails_FeeTypes]
GO
/****** Object:  ForeignKey [FK_FeeStructures_ClassesSections]    Script Date: 07/23/2017 18:35:49 ******/
ALTER TABLE [dbo].[FeeStructures]  WITH CHECK ADD  CONSTRAINT [FK_FeeStructures_ClassesSections] FOREIGN KEY([ClassSectionID])
REFERENCES [dbo].[ClassesSections] ([ClassSectionID])
GO
ALTER TABLE [dbo].[FeeStructures] CHECK CONSTRAINT [FK_FeeStructures_ClassesSections]
GO
/****** Object:  ForeignKey [FK_Shifts_ShiftTypes]    Script Date: 07/23/2017 18:35:49 ******/
ALTER TABLE [dbo].[Shifts]  WITH CHECK ADD  CONSTRAINT [FK_Shifts_ShiftTypes] FOREIGN KEY([ShiftTypeID])
REFERENCES [dbo].[ShiftTypes] ([ShiftTypeID])
GO
ALTER TABLE [dbo].[Shifts] CHECK CONSTRAINT [FK_Shifts_ShiftTypes]
GO
/****** Object:  ForeignKey [FK_States_Countries]    Script Date: 07/23/2017 18:35:49 ******/
ALTER TABLE [dbo].[States]  WITH CHECK ADD  CONSTRAINT [FK_States_Countries] FOREIGN KEY([CountryId])
REFERENCES [dbo].[Countries] ([CountryId])
GO
ALTER TABLE [dbo].[States] CHECK CONSTRAINT [FK_States_Countries]
GO
/****** Object:  ForeignKey [FK_StudentParent_Parents]    Script Date: 07/23/2017 18:35:49 ******/
ALTER TABLE [dbo].[StudentParent]  WITH CHECK ADD  CONSTRAINT [FK_StudentParent_Parents] FOREIGN KEY([ParentID])
REFERENCES [dbo].[Parents] ([ParentID])
GO
ALTER TABLE [dbo].[StudentParent] CHECK CONSTRAINT [FK_StudentParent_Parents]
GO
/****** Object:  ForeignKey [FK_StudentParent_Students]    Script Date: 07/23/2017 18:35:49 ******/
ALTER TABLE [dbo].[StudentParent]  WITH CHECK ADD  CONSTRAINT [FK_StudentParent_Students] FOREIGN KEY([StudentID])
REFERENCES [dbo].[Students] ([StudentID])
GO
ALTER TABLE [dbo].[StudentParent] CHECK CONSTRAINT [FK_StudentParent_Students]
GO
/****** Object:  ForeignKey [FK_Students_Countries]    Script Date: 07/23/2017 18:35:49 ******/
ALTER TABLE [dbo].[Students]  WITH CHECK ADD  CONSTRAINT [FK_Students_Countries] FOREIGN KEY([NationalityId])
REFERENCES [dbo].[Countries] ([CountryId])
GO
ALTER TABLE [dbo].[Students] CHECK CONSTRAINT [FK_Students_Countries]
GO
/****** Object:  ForeignKey [FK_Students_Languages]    Script Date: 07/23/2017 18:35:49 ******/
ALTER TABLE [dbo].[Students]  WITH CHECK ADD  CONSTRAINT [FK_Students_Languages] FOREIGN KEY([Lang1ID])
REFERENCES [dbo].[Languages] ([LangId])
GO
ALTER TABLE [dbo].[Students] CHECK CONSTRAINT [FK_Students_Languages]
GO
/****** Object:  ForeignKey [FK_Students_Languages1]    Script Date: 07/23/2017 18:35:49 ******/
ALTER TABLE [dbo].[Students]  WITH CHECK ADD  CONSTRAINT [FK_Students_Languages1] FOREIGN KEY([Lang2Id])
REFERENCES [dbo].[Languages] ([LangId])
GO
ALTER TABLE [dbo].[Students] CHECK CONSTRAINT [FK_Students_Languages1]
GO
/****** Object:  ForeignKey [FK_Students_Religions]    Script Date: 07/23/2017 18:35:49 ******/
ALTER TABLE [dbo].[Students]  WITH CHECK ADD  CONSTRAINT [FK_Students_Religions] FOREIGN KEY([ReligionId])
REFERENCES [dbo].[Religions] ([ReligionId])
GO
ALTER TABLE [dbo].[Students] CHECK CONSTRAINT [FK_Students_Religions]
GO
/****** Object:  ForeignKey [FK_StudentsClasses_Batches]    Script Date: 07/23/2017 18:35:49 ******/
ALTER TABLE [dbo].[StudentsClasses]  WITH CHECK ADD  CONSTRAINT [FK_StudentsClasses_Batches] FOREIGN KEY([BatchID])
REFERENCES [dbo].[Batches] ([BatchID])
GO
ALTER TABLE [dbo].[StudentsClasses] CHECK CONSTRAINT [FK_StudentsClasses_Batches]
GO
/****** Object:  ForeignKey [FK_StudentsClasses_ClassesSections]    Script Date: 07/23/2017 18:35:49 ******/
ALTER TABLE [dbo].[StudentsClasses]  WITH CHECK ADD  CONSTRAINT [FK_StudentsClasses_ClassesSections] FOREIGN KEY([ClassSectionID])
REFERENCES [dbo].[ClassesSections] ([ClassSectionID])
GO
ALTER TABLE [dbo].[StudentsClasses] CHECK CONSTRAINT [FK_StudentsClasses_ClassesSections]
GO
/****** Object:  ForeignKey [FK_StudentsClasses_Students]    Script Date: 07/23/2017 18:35:49 ******/
ALTER TABLE [dbo].[StudentsClasses]  WITH CHECK ADD  CONSTRAINT [FK_StudentsClasses_Students] FOREIGN KEY([StudentID])
REFERENCES [dbo].[Students] ([StudentID])
GO
ALTER TABLE [dbo].[StudentsClasses] CHECK CONSTRAINT [FK_StudentsClasses_Students]
GO
/****** Object:  ForeignKey [FK_Subjects_SubjectTypes]    Script Date: 07/23/2017 18:35:49 ******/
ALTER TABLE [dbo].[Subjects]  WITH CHECK ADD  CONSTRAINT [FK_Subjects_SubjectTypes] FOREIGN KEY([SubjectTypeID])
REFERENCES [dbo].[SubjectTypes] ([SubjectTypeID])
GO
ALTER TABLE [dbo].[Subjects] CHECK CONSTRAINT [FK_Subjects_SubjectTypes]
GO
/****** Object:  ForeignKey [FK_TeacherExperiences_Cities]    Script Date: 07/23/2017 18:35:49 ******/
ALTER TABLE [dbo].[TeacherExperiences]  WITH CHECK ADD  CONSTRAINT [FK_TeacherExperiences_Cities] FOREIGN KEY([CityId])
REFERENCES [dbo].[Cities] ([CityId])
GO
ALTER TABLE [dbo].[TeacherExperiences] CHECK CONSTRAINT [FK_TeacherExperiences_Cities]
GO
/****** Object:  ForeignKey [FK_TeacherExperiences_Countries]    Script Date: 07/23/2017 18:35:49 ******/
ALTER TABLE [dbo].[TeacherExperiences]  WITH CHECK ADD  CONSTRAINT [FK_TeacherExperiences_Countries] FOREIGN KEY([CountryId])
REFERENCES [dbo].[Countries] ([CountryId])
GO
ALTER TABLE [dbo].[TeacherExperiences] CHECK CONSTRAINT [FK_TeacherExperiences_Countries]
GO
/****** Object:  ForeignKey [FK_TeacherExperiences_States]    Script Date: 07/23/2017 18:35:49 ******/
ALTER TABLE [dbo].[TeacherExperiences]  WITH CHECK ADD  CONSTRAINT [FK_TeacherExperiences_States] FOREIGN KEY([StateId])
REFERENCES [dbo].[States] ([StateId])
GO
ALTER TABLE [dbo].[TeacherExperiences] CHECK CONSTRAINT [FK_TeacherExperiences_States]
GO
/****** Object:  ForeignKey [FK_TeacherExperiences_Teachers]    Script Date: 07/23/2017 18:35:49 ******/
ALTER TABLE [dbo].[TeacherExperiences]  WITH CHECK ADD  CONSTRAINT [FK_TeacherExperiences_Teachers] FOREIGN KEY([TeacherId])
REFERENCES [dbo].[Teachers] ([TeacherId])
GO
ALTER TABLE [dbo].[TeacherExperiences] CHECK CONSTRAINT [FK_TeacherExperiences_Teachers]
GO
/****** Object:  ForeignKey [FK_TeacherQualifications_QualificationTypes]    Script Date: 07/23/2017 18:35:49 ******/
ALTER TABLE [dbo].[TeacherQualifications]  WITH CHECK ADD  CONSTRAINT [FK_TeacherQualifications_QualificationTypes] FOREIGN KEY([QualificationTypeId])
REFERENCES [dbo].[QualificationTypes] ([QualificationTypeId])
GO
ALTER TABLE [dbo].[TeacherQualifications] CHECK CONSTRAINT [FK_TeacherQualifications_QualificationTypes]
GO
/****** Object:  ForeignKey [FK_TeacherQualifications_Teachers]    Script Date: 07/23/2017 18:35:49 ******/
ALTER TABLE [dbo].[TeacherQualifications]  WITH CHECK ADD  CONSTRAINT [FK_TeacherQualifications_Teachers] FOREIGN KEY([TeacherId])
REFERENCES [dbo].[Teachers] ([TeacherId])
GO
ALTER TABLE [dbo].[TeacherQualifications] CHECK CONSTRAINT [FK_TeacherQualifications_Teachers]
GO
/****** Object:  ForeignKey [FK_Teachers_Countries]    Script Date: 07/23/2017 18:35:49 ******/
ALTER TABLE [dbo].[Teachers]  WITH CHECK ADD  CONSTRAINT [FK_Teachers_Countries] FOREIGN KEY([NationalityId])
REFERENCES [dbo].[Countries] ([CountryId])
GO
ALTER TABLE [dbo].[Teachers] CHECK CONSTRAINT [FK_Teachers_Countries]
GO
/****** Object:  ForeignKey [FK_TeachersSubjects_Subjects]    Script Date: 07/23/2017 18:35:49 ******/
ALTER TABLE [dbo].[TeachersSubjects]  WITH CHECK ADD  CONSTRAINT [FK_TeachersSubjects_Subjects] FOREIGN KEY([SubjectID])
REFERENCES [dbo].[Subjects] ([SubjectID])
GO
ALTER TABLE [dbo].[TeachersSubjects] CHECK CONSTRAINT [FK_TeachersSubjects_Subjects]
GO
/****** Object:  ForeignKey [FK_TeachersSubjects_Teachers]    Script Date: 07/23/2017 18:35:49 ******/
ALTER TABLE [dbo].[TeachersSubjects]  WITH CHECK ADD  CONSTRAINT [FK_TeachersSubjects_Teachers] FOREIGN KEY([TeacherID])
REFERENCES [dbo].[Teachers] ([TeacherId])
GO
ALTER TABLE [dbo].[TeachersSubjects] CHECK CONSTRAINT [FK_TeachersSubjects_Teachers]
GO
/****** Object:  ForeignKey [FK_TimeTable_StudentsClasses]    Script Date: 07/23/2017 18:35:49 ******/
ALTER TABLE [dbo].[TimeTable]  WITH CHECK ADD  CONSTRAINT [FK_TimeTable_StudentsClasses] FOREIGN KEY([StudentClassID])
REFERENCES [dbo].[StudentsClasses] ([StudentClassID])
GO
ALTER TABLE [dbo].[TimeTable] CHECK CONSTRAINT [FK_TimeTable_StudentsClasses]
GO
/****** Object:  ForeignKey [FK_TimeTableDetails_Days1]    Script Date: 07/23/2017 18:35:49 ******/
ALTER TABLE [dbo].[TimeTableDetails]  WITH CHECK ADD  CONSTRAINT [FK_TimeTableDetails_Days1] FOREIGN KEY([DayID])
REFERENCES [dbo].[Days] ([DayID])
GO
ALTER TABLE [dbo].[TimeTableDetails] CHECK CONSTRAINT [FK_TimeTableDetails_Days1]
GO
/****** Object:  ForeignKey [FK_TimeTableDetails_Locations]    Script Date: 07/23/2017 18:35:49 ******/
ALTER TABLE [dbo].[TimeTableDetails]  WITH CHECK ADD  CONSTRAINT [FK_TimeTableDetails_Locations] FOREIGN KEY([LocationID])
REFERENCES [dbo].[Locations] ([LocationID])
GO
ALTER TABLE [dbo].[TimeTableDetails] CHECK CONSTRAINT [FK_TimeTableDetails_Locations]
GO
/****** Object:  ForeignKey [FK_TimeTableDetails_TeachersSubjects]    Script Date: 07/23/2017 18:35:49 ******/
ALTER TABLE [dbo].[TimeTableDetails]  WITH CHECK ADD  CONSTRAINT [FK_TimeTableDetails_TeachersSubjects] FOREIGN KEY([TeacherSubjectID])
REFERENCES [dbo].[TeachersSubjects] ([TeacherSubjectID])
GO
ALTER TABLE [dbo].[TimeTableDetails] CHECK CONSTRAINT [FK_TimeTableDetails_TeachersSubjects]
GO
/****** Object:  ForeignKey [FK_TimeTableDetails_TimeTable]    Script Date: 07/23/2017 18:35:49 ******/
ALTER TABLE [dbo].[TimeTableDetails]  WITH CHECK ADD  CONSTRAINT [FK_TimeTableDetails_TimeTable] FOREIGN KEY([TimeTableID])
REFERENCES [dbo].[TimeTable] ([TimeTableID])
GO
ALTER TABLE [dbo].[TimeTableDetails] CHECK CONSTRAINT [FK_TimeTableDetails_TimeTable]
GO
