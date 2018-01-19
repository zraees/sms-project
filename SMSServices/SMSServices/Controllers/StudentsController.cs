using SMSServices.Models;
using SMSServices.Utilities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.Validation;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using WebApi.ErrorHelper;

namespace SMSServices.Controllers
{
    public class StudentsController : ApiController
    {

        private SMSEntities entities = new SMSEntities();

        [HttpGet]
        [Route("api/Students/GenerateSampleData/")]
        public int GenerateSampleData()
        {
            int index0, index1, index2, index3, boyOrGirl;
            string gender;
            int result = 0;

            Random rnd = new Random();
            Students student = new Students();
            string[,] StudentNames = new SampleData().StudentNames;
            string[,] StudentNamesAr = new SampleData().StudentNamesAr;

            foreach (var shift in entities.Shifts.ToList())
            {
                foreach (var classe in entities.Classes.ToList())
                {
                    foreach (var section in entities.Sections.ToList())
                    {
                        foreach (var batch in entities.Batches.ToList())
                        {
                            for (int i = 0; i < (shift.ID+classe.ID+section.ID+batch.ID )% 10; i++)
                            {
                                student = new Students();
                                student.ShiftId = shift.ID;
                                student.ClassId = classe.ID;
                                student.SectionId = section.ID;
                                student.BatchId = batch.ID;

                                index0 = rnd.Next(10); index1 = rnd.Next(10); index2 = rnd.Next(10); index3 = rnd.Next(10);

                                if (i % 2 == 0) {
                                    gender = "Female";
                                    boyOrGirl = 0;
                                }
                                else
                                {
                                    gender = "Male";
                                    boyOrGirl = 1;
                                }
                                student.Name1 = StudentNames[boyOrGirl,index0];
                                student.Name2 = StudentNames[boyOrGirl, index1];
                                student.Name3 = StudentNames[boyOrGirl, index2];
                                student.Name4 = StudentNames[boyOrGirl, index3];
                                student.FullName = string.Format("{0} {1} {2} {3}", student.Name1, student.Name2, student.Name3, student.Name4);
                                student.NameAr1 = StudentNamesAr[boyOrGirl, index0];
                                student.NameAr2 = StudentNamesAr[boyOrGirl, index1];
                                student.NameAr3 = StudentNamesAr[boyOrGirl, index2];
                                student.NameAr4 = StudentNamesAr[boyOrGirl, index3];
                                student.FullNameAr = string.Format("{0} {1} {2} {3}", student.NameAr1, student.NameAr2, student.NameAr3, student.NameAr4);
                                student.DOB = DateTime.Now.AddYears(-1 * (classe.ID == 1 ? 3 : classe.ID + 1));
                                student.FullNamePassport = student.FullName;
                                student.FullNameArPassport = student.FullNameAr;
                                student.FatherIDNo = rnd.Next(int.MaxValue - 50000, int.MaxValue).ToString().PadLeft(10, '0');
                                student.StudentIDNo = rnd.Next(int.MaxValue - 250000, int.MaxValue).ToString().PadLeft(10, '0');
                                student.PlaceOfBirth = "";
                                //student.NationalityId = Student.NationalityId;
                                student.Email = student.Name1 +"."+ student.Name2 + "@domain.com";
                                student.Gender = gender;
                                //student.Lang1ID = Student.Lang1ID;
                                //student.Lang2Id = Student.Lang2Id;
                                //student.ReligionId = Student.ReligionId;
                                //student.PhoneNo = Student.PhoneNo;
                                //student.MobileNo = Student.MobileNo;
                                //student.Address = Student.Address;
                                //student.StudentStayWith = Student.StudentStayWith;
                                //student.StudentStayWithOther = Student.StudentStayWithOther;
                                //student.CountryId = Student.CountryId;
                                //student.StateId = Student.StateId;
                                //student.CityId = Student.CityId;
                                 
                                entities.Students.Add(CreateStudent(student));
                                entities.SaveChanges();
                                result++;
                            }
                            
                        }
                    }
                }
            }

            return result;
        }

        [HttpGet]
        [Route("api/GetStudentGeneratedCode/")]
        public string GetStudentGeneratedCode()
        {
            return new AutoCodeGeneration().GenerateCode("Students", "Code");
        }

        [HttpPost]
        [Route("api/GetStudentRollNo/")]
        public string GetStudentRollNo(Students Student)
        {
            Dictionary<object, object> conditions = new Dictionary<object, object>();
            conditions.Add("ShiftId", Student.ShiftId);
            conditions.Add("ClassId", Student.ClassId);
            conditions.Add("SectionId", Student.SectionId);
            conditions.Add("BatchID", Student.BatchId);
            return new AutoCodeGeneration().GenerateCode("StudentsClasses", "RollNo", conditions);
        }

        // GET api/<controller>
        public IEnumerable<Students> Get()
        {
            entities.Configuration.ProxyCreationEnabled = false;
            return entities.Students;
        }

        // GET api/<controller>/5
        public Students Get(int id)
        {
            entities.Configuration.ProxyCreationEnabled = false;
            return entities.Students.Where(t => t.StudentId == id).FirstOrDefault();
        }

        // GET api/<controller>/5/email@domain.com
        [Route("api/Students/{id}/{email}")]
        public Students Get(int id, string email)
        {
            entities.Configuration.ProxyCreationEnabled = false;
            Students Student;
            //Student = entities.Students.Where(t => t.StudentId == id && t.Email == email).FirstOrDefault();
            //if (Student == null)
                Student = new Students() { Email = string.Empty };
            return Student;
        }

        [Route("api/GetStudentsByShiftIdClassIdSectionId/{ShiftId}/{ClassId}/{SectionId}/{BatchId}")]
        public HttpResponseMessage GetStudentsByShiftClassSection(int ShiftID, int ClassID, int SectionID, int BatchID)
        {
            entities.Configuration.ProxyCreationEnabled = false;

            ClassesSections ClassSection = entities.ClassesSections
                .FirstOrDefault();

            var query = entities.StudentsClasses
                .Where(t => t.ShiftId == ShiftID && t.ClassId == ClassID && t.SectionId == SectionID && t.BatchID == BatchID)
                .Select(e => new
                {
                    RollNp = e.RollNo,
                    StudentID = e.StudentId,
                    Id = e.StudentId,
                    Name = e.Students.FullName,
                    NameAr = e.Students.FullNameAr
                });

            return this.Request.CreateResponse(HttpStatusCode.OK, query.ToList().Distinct());
        }

        [Route("api/GetStudentControlData/{lang}/{ShiftId}/{ClassId}/{SectionId}/{BatchId}/{studentId}")]
        public HttpResponseMessage GetStudentsByShiftClassSection(string Lang, int ShiftID, int ClassID, int SectionID, int BatchID, int StudentID)
        {
            entities.Configuration.ProxyCreationEnabled = false;

            Shifts Shift = entities.Shifts.FirstOrDefault(s=>s.ID ==ShiftID);
            string ShiftName = Shift != null ? Lang == "" || Lang == "us" ? Shift.Name : Shift.NameAr : "";
            Classes Class = entities.Classes.FirstOrDefault(s => s.ID == ClassID);
            string ClassName = Class != null ? Lang == "" || Lang == "us" ? Class.Name : Class.NameAr : "";
            Sections Section = entities.Sections.FirstOrDefault(s => s.ID == SectionID);
            string SectionName = Section != null ? Lang == "" || Lang == "us" ? Section.Name : Section.NameAr : "";
            Batches Batch = entities.Batches.FirstOrDefault(s => s.ID == BatchID);
            string BatchName = Batch != null ? Lang == "" || Lang == "us" ? Batch.Name : Batch.NameAr : "";
            Students Student = entities.Students.FirstOrDefault(s => s.StudentId == StudentID);
            string StudentName = Student != null ? Lang == "" || Lang == "us" ? Student.FullName : Student.FullNameAr : "";
            string StudentCode = Student != null ? Student.Code : "";
            string StudentRollNo =  "";


            return this.Request.CreateResponse(HttpStatusCode.OK, new { ShiftName, ClassName, SectionName, BatchName, StudentCode, StudentRollNo, StudentName });
        }

        // POST api/<controller>
        public HttpResponseMessage Post(Students Student)
        {
            try
            {
                Students std = CreateStudent(Student);

                entities.Students.Add(std);
                entities.SaveChanges();
                //var entity = entities.Students.Find(std.StudentId);
                //if (entity != null)
                //{
                //    entities.Entry(entity).CurrentValues.SetValues(new Students() { StudentIDNo = "111 222 333" });
                //    entities.SaveChanges();
                //}

                //using (var newContext = new SMSEntities())
                //{
                //    std.StudentPic = std.StudentId .ToString() + "11 22 33 44 55";
                //    newContext.Students.Attach(std);
                //    newContext.Entry(std).Property(X => X.StudentIDNo).IsModified = true;
                //    newContext.SaveChanges();
                //}

                return Request.CreateResponse(HttpStatusCode.OK, std.StudentId);
                //return Request.CreateResponse(HttpStatusCode.BadRequest, "I have some issue ...");
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, "I have some issue ..." + ex.Message);
            }
            //catch (DbUpdateException dbEx)
            //{
            //    throw dbEx;
            //    //return Request.CreateResponse(HttpStatusCode.BadRequest, "I have more issue ...");
            //    //StringBuilder sb = new StringBuilder();
            //    //foreach (var item in dbEx.EntityValidationErrors)
            //    //{
            //    //    sb.Append(item + " errors: ");
            //    //    foreach (var i in item.ValidationErrors)
            //    //    {
            //    //        sb.Append(i.PropertyName + " : " + i.ErrorMessage);
            //    //    }
            //    //    sb.Append(Environment.NewLine);
            //    //}
            //    ////throw new ApiDataException(GetErrorCode(dbEx), sb.ToString(), HttpStatusCode.BadRequest);
            //    //throw new ApiDataException(1021, "too many errors ...", HttpStatusCode.BadRequest);
            //    //return Request.CreateResponse(HttpStatusCode.OK, sb.ToString());
            //}

            ////catch (DbUpdateException ex)
            ////{
            ////    throw ex;
            ////    //return Request.CreateResponse(HttpStatusCode.BadRequest, ex);
            ////}
        }

        private Students CreateStudent(Students Student)
        {
            List<StudentsClasses> classes = new List<StudentsClasses>();
            classes.Add(new StudentsClasses()
            {
                ShiftId = Student.ShiftId,
                ClassId = Student.ClassId,
                SectionId = Student.SectionId,
                BatchID = Student.BatchId,
                RollNo = GetStudentRollNo(Student)
            });
            Students std = new Students()
            {
                //StudentId
                Code = new AutoCodeGeneration().GenerateCode("Students", "Code"),   //"" + Student.Code,
                Name1 = "" + Student.Name1,
                Name2 = "" + Student.Name2,
                Name3 = "" + Student.Name3,
                Name4 = "" + Student.Name4,
                FullName = "" + Student.FullName,
                NameAr1 = "" + Student.NameAr1,
                NameAr2 = "" + Student.NameAr2,
                NameAr3 = "" + Student.NameAr3,
                NameAr4 = "" + Student.NameAr4,
                FullNameAr = "" + Student.FullNameAr,
                StudentsClasses = classes,
                DOB = Student.DOB,
                FullNamePassport = "" + Student.FullNamePassport,
                FullNameArPassport = "" + Student.FullNameArPassport,
                FatherIDNo = Student.FatherIDNo,
                StudentIDNo = Student.StudentIDNo,
                PlaceOfBirth = Student.PlaceOfBirth,
                NationalityId = Student.NationalityId,
                Email = Student.Email,
                Gender = Student.Gender,
                Lang1ID = Student.Lang1ID,
                Lang2Id = Student.Lang2Id,
                ReligionId = Student.ReligionId,
                PhoneNo = Student.PhoneNo,
                MobileNo = Student.MobileNo,
                Address = Student.Address,
                StudentStayWith = Student.StudentStayWith,
                StudentStayWithOther = Student.StudentStayWithOther,
                //HasSameSchoolAttendedBefore = Student.HasSameSchoolAttendedBefore,
                //SchoolAttendedStartDate = Student.SchoolAttendedStartDate,
                //SchoolAttendedEndDate = Student.SchoolAttendedEndDate,
                //HasStudentEverSkippedGrade = Student.HasStudentEverSkippedGrade,
                //SkippedGrades = Student.SkippedGrades,
                //HasStudentRepeatGrade = Student.HasStudentRepeatGrade,
                //RepeatGrades = Student.RepeatGrades
                CountryId = Student.CountryId,
                StateId = Student.StateId,
                CityId = Student.CityId,
                CreatedOn = DateTime.Now
            };
            return std;
        }
        
        private int GetErrorCode(DbEntityValidationException dbEx)
        {
            int ErrorCode = (int)HttpStatusCode.BadRequest;
            if (dbEx.InnerException != null && dbEx.InnerException.InnerException != null)
            {
                if (dbEx.InnerException.InnerException is SqlException)
                {
                    ErrorCode = (dbEx.InnerException.InnerException as SqlException).Number;
                }
            }

            return ErrorCode;
        }

        // PUT api/<controller>/5
        public void Put(Students Student)
        {
            try
            {
                var entity = entities.Students.Find(Student.StudentId);
                if (entity != null)
                {
                    entities.Entry(entity).CurrentValues.SetValues(Student);
                    entities.SaveChanges();
                }
                //var result = entities.Students.SingleOrDefault(t => t.StudentId == Student.StudentId);
                //if (result != null)
                //{
                //    //int a = Convert.ToInt32("aaa");
                //    result.Name = Student.Name;
                //    result.Email = Student.Email;
                //    result.DOB = Student.DOB;
                //    result.Gender = Student.Gender;
                //    result.IDNo = Student.IDNo;
                //    result.NationalityId = Student.NationalityId;
                //    result.Rating = Student.Rating;

                //    entities.Students.Attach(result);
                //    entities.Entry(result).State = System.Data.Entity.EntityState.Modified;
                //    entities.SaveChanges();
                //}
            }
            catch //(DbUpdateException)
            {
                throw;
            }
        }

        // PUT api/<controller>/5

        [Route("api/AddStudentPicPath/{StudentId}/{StudentPic}")]
        public HttpResponseMessage Put(int StudentId, string StudentPic)
        {
            try
            {
                using (var newContext = new SMSEntities())
                {
                    Students Student = new Students();
                    Student.StudentId = Student.StudentId;
                    Student.StudentPic = Student.StudentPic;
                    newContext.Students.Attach(Student);
                    newContext.Entry(Student).Property(X => X.StudentPic).IsModified = true;
                    newContext.SaveChanges();
                }

                return Request.CreateResponse(HttpStatusCode.OK, "Done"); 
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, "I have some issue ..." + ex.Message);
            }
        }

        /*
        // DELETE api/<controller>/5
        public void Delete(int id)
        {
            try
            {
                var Student = new Students { StudentId = id };
                if (Student != null)
                {
                    entities.Entry(Student).State = EntityState.Deleted;
                    entities.Students.Remove(Student);
                    entities.SaveChanges();
                }
            }
            catch (Exception)
            {

                throw;
            }
        }
        */

        [HttpPost]
        [Route("api/RemoveStudent/{id}")]
        public HttpResponseMessage RemoveStudent(int id)
        {
            try
            {
                var Student = new Students { StudentId = id };
                if (Student != null)
                {
                    //var parent = entities.Students.Include(p => p.StudentsClasses)
                    //                .SingleOrDefault(p => p.StudentId == id);

                    //foreach (var child in parent.StudentsClasses.ToList())
                    //{
                    //    entities.Entry(child).State = EntityState.Deleted;
                    //    entities.StudentsClasses.Remove(child);
                    //}

                    entities.Entry(Student).State = EntityState.Deleted;
                    entities.Students.Remove(Student);
                    entities.SaveChanges();
                    return Request.CreateResponse(HttpStatusCode.OK, "Removed...");
                }
                else
                    return Request.CreateResponse(HttpStatusCode.NotFound, "not found...");

            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ex);
                //return Request.CreateResponse(HttpStatusCode.BadRequest, ex.Message + 
                //    " inner ex: " + ex.InnerException !=null ? ex.InnerException.Message : "null" );
                //throw;
            }
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                entities.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}