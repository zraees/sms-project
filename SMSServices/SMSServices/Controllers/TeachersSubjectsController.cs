using SMSServices.Models;
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
    public class TeachersSubjectsController : ApiController
    {
        private SMSEntities entities = new SMSEntities();

        // GET api/<controller>
        [Route("api/TeachersSubjects/All/{teacherId}")]
        //public IEnumerable<TeachersSubjects> Get()
        public HttpResponseMessage Get(int teacherId)
        {
            entities.Configuration.ProxyCreationEnabled = false;

            var query = entities.TeachersSubjects//.Include("Classes").Include("Shifts");
                //query.Include("Sections")
            .Where(t => t.TeacherID == teacherId)
            .Select(e => new
            {
                e.TeacherSubjectID,
                e.TeacherID,
                TeacherName = e.Teachers.Name,
                e.SubjectID,
                SubjectCode = e.Subjects.Code,
                SubjectName = e.Subjects.Name,
                SubjectNameAr = e.Subjects.NameAr,
                Id = e.SubjectID,
                Code = e.Subjects.Code,
                Name = e.Subjects.Name,
                NameAr = e.Subjects.NameAr
            });

            //return query.ToList(); //entities.TeachersSubjects.Include("Classes").Include("Shifts").Include("Sections");
            return this.Request.CreateResponse(HttpStatusCode.OK, query.ToList());
        }

        // POST api/<controller>
        [Route("api/TeachersSubjects/{TeacherID}/{SubjectIDs}")]
        public HttpResponseMessage Post(int TeacherID, string SubjectIDs)
        {
            try
            {
                foreach (string ID in SubjectIDs.Split(','))
                {
                    entities.TeachersSubjects.Add(new TeachersSubjects()
                    {
                        TeacherID = TeacherID,
                        SubjectID = Convert.ToInt32(ID)
                    });
                }
                entities.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK, "Done ...");
            }
            //catch (Exception e)
            //{
            //    return Request.CreateResponse(HttpStatusCode.BadRequest, "I have some issue ...");

            //}
            catch (DbUpdateException dbEx)
            {
                throw dbEx;
                //return Request.CreateResponse(HttpStatusCode.BadRequest, "I have more issue ...");
                //StringBuilder sb = new StringBuilder();
                //foreach (var item in dbEx.EntityValidationErrors)
                //{
                //    sb.Append(item + " errors: ");
                //    foreach (var i in item.ValidationErrors)
                //    {
                //        sb.Append(i.PropertyName + " : " + i.ErrorMessage);
                //    }
                //    sb.Append(Environment.NewLine);
                //}
                ////throw new ApiDataException(GetErrorCode(dbEx), sb.ToString(), HttpStatusCode.BadRequest);
                //throw new ApiDataException(1021, "too many errors ...", HttpStatusCode.BadRequest);
                //return Request.CreateResponse(HttpStatusCode.OK, sb.ToString());
            }
            //catch (DbUpdateException ex)
            //{
            //    throw ex;
            //    //return Request.CreateResponse(HttpStatusCode.BadRequest, ex);
            //}
        }

        //// GET api/<controller>/5/1/2
        //[Route("api/TeachersSubjects/{ShiftId}/{ClassId}/{SectionId}")]
        //public TeachersSubjects Get(int ShiftId, int ClassId, int SectionId)
        //{
        //    entities.Configuration.ProxyCreationEnabled = false;
         
        //    TeachersSubjects TeacherSubject = entities.TeachersSubjects
        //        .Where(t => t.ShiftID == ShiftId && t.ClassID == ClassId && t.SectionID == SectionId).FirstOrDefault();

        //    if (TeacherSubject == null)
        //    {
        //        TeacherSubject = new TeachersSubjects() { ClassID = 0 };
        //    }

        //    return TeacherSubject;
        //}

        //[Route("api/TeachersSubjectsById/{id}")]
        //public TeachersSubjects Get(int id)
        //{
        //    entities.Configuration.ProxyCreationEnabled = false;
        //    return entities.TeachersSubjects.Where(t => t.TeacherSubjectID == id).FirstOrDefault();
        //}

        // POST api/<controller>
        //public HttpResponseMessage Post(TeachersSubjects teacher)
        //{
        //    try
        //    {
        //        entities.TeachersSubjects.Add(new TeachersSubjects()
        //        {
        //            TeacherID = teacher.TeacherID,
        //            SubjectID = teacher.SubjectID
        //        });
        //        entities.SaveChanges();
        //        return Request.CreateResponse(HttpStatusCode.OK, "Done ...");
        //    }
        //    //catch (Exception e)
        //    //{
        //    //    return Request.CreateResponse(HttpStatusCode.BadRequest, "I have some issue ...");

        //    //}
        //    catch (DbUpdateException dbEx)
        //    {
        //        throw dbEx;
        //        //return Request.CreateResponse(HttpStatusCode.BadRequest, "I have more issue ...");
        //        //StringBuilder sb = new StringBuilder();
        //        //foreach (var item in dbEx.EntityValidationErrors)
        //        //{
        //        //    sb.Append(item + " errors: ");
        //        //    foreach (var i in item.ValidationErrors)
        //        //    {
        //        //        sb.Append(i.PropertyName + " : " + i.ErrorMessage);
        //        //    }
        //        //    sb.Append(Environment.NewLine);
        //        //}
        //        ////throw new ApiDataException(GetErrorCode(dbEx), sb.ToString(), HttpStatusCode.BadRequest);
        //        //throw new ApiDataException(1021, "too many errors ...", HttpStatusCode.BadRequest);
        //        //return Request.CreateResponse(HttpStatusCode.OK, sb.ToString());
        //    }
        //    //catch (DbUpdateException ex)
        //    //{
        //    //    throw ex;
        //    //    //return Request.CreateResponse(HttpStatusCode.BadRequest, ex);
        //    //}
        //}

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
        public void Put(TeachersSubjects TeacherSubject)
        {
            try
            {
                var entity = entities.TeachersSubjects.Find(TeacherSubject.TeacherSubjectID);
                if (entity != null)
                {
                    entities.Entry(entity).CurrentValues.SetValues(TeacherSubject);
                    entities.SaveChanges();
                }
            }
            catch //(DbUpdateException)
            {
                throw;
            }
        }

        /*
        // DELETE api/<controller>/5
        public void Delete(int id)
        {
            try
            {
                var teacher = new TeachersSubjects { TeacherId = id };
                if (teacher != null)
                {
                    entities.Entry(teacher).State = EntityState.Deleted;
                    entities.TeachersSubjects.Remove(teacher);
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
        [Route("api/RemoveTeacherSubject/{id}")]
        public HttpResponseMessage RemoveTeacherSubject(int id)
        {
            try
            {
                var TeacherSubject = new TeachersSubjects {  TeacherSubjectID = id };
                if (TeacherSubject != null)
                {
                    entities.Entry(TeacherSubject).State = EntityState.Deleted;
                    entities.TeachersSubjects.Remove(TeacherSubject);
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