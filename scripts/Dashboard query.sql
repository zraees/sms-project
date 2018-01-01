USE SMS


-- Total Student Counts
SELECT        StudentsClasses.BatchID, Batches.Name, Batches.NameAr, StudentsClasses.ShiftId, Shifts.Name AS Expr1, Shifts.NameAr AS Expr2, StudentsClasses.ClassId, Classes.Name AS Expr3, Classes.NameAr AS Expr4, 
                         StudentsClasses.SectionId, Sections.Name AS Expr5, Sections.NameAr AS Expr6, count(StudentsClasses.StudentId) as TotalStudents
FROM            StudentsClasses INNER JOIN
                         Shifts ON StudentsClasses.ShiftId = Shifts.ID INNER JOIN
                         Batches ON StudentsClasses.BatchID = Batches.ID INNER JOIN
                         Sections ON StudentsClasses.SectionId = Sections.ID INNER JOIN
                         Classes ON StudentsClasses.ClassId = Classes.ID
						 group by StudentsClasses.BatchID, Batches.Name, Batches.NameAr, StudentsClasses.ShiftId, Shifts.Name, Shifts.NameAr, StudentsClasses.ClassId, Classes.Name, Classes.NameAr, 
                         StudentsClasses.SectionId, Sections.Name, Sections.NameAr