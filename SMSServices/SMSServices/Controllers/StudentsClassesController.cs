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
    public class StudentsClassesController : ApiController
    {
        private SMSEntities entities = new SMSEntities();

        // GET api/<controller>
        [Route("api/StudentsClasses/All/{StudentID}")]
        //public IEnumerable<StudentsClasses> Get()
        public HttpResponseMessage Get(int StudentID)
        {
            entities.Configuration.ProxyCreationEnabled = false;

            var query = entities.StudentsClasses//.Include("Classes").Include("Shifts");
                //query.Include("Sections")
            .Where(t => t.StudentId == StudentID)
            .Select(e => new
            {
                e.StudentClassId,
                e.StudentId,
                Id = e.StudentId,
                Name = e.Students.Name,
                NameAr = e.Students.Name,
                e.ClassId,
                ClassCode = e.Classes.Code,
                ClassName = e.Classes.Name,
                ClassNameAr = e.Classes.NameAr
            });

            //return query.ToList(); //entities.StudentsClasses.Include("Classes").Include("Shifts").Include("Sections");
            return this.Request.CreateResponse(HttpStatusCode.OK, query.ToList());
        }


        // GET api/<controller>/5/1/2
        [Route("api/StudentsClasses/GetByIDs/{ShiftId}/{ClassId}/{SectionId}/{batchId}/{studentId}")]
        public List<StudentsClasses> GetByIDs(int ShiftId, int ClassId, int SectionId, int batchId, int? studentId)
        {
            entities.Configuration.ProxyCreationEnabled = false;

            List<StudentsClasses> result = entities.StudentsClasses
                .Where(t => t.ShiftId == ShiftId && t.ClassId == ClassId
                    && t.SectionId == SectionId && t.BatchID == batchId
                    && t.StudentId == (studentId.HasValue ? studentId.Value : t.StudentId))
                    .ToList();
                //.Select(x => new
                //{
                //    x.StudentClassId,
                //    x.StudentId
                //});

            return result;
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
         
        /*
        // DELETE api/<controller>/5
        public void Delete(int id)
        {
            try
            {
                var teacher = new StudentsClasses { StudentID = id };
                if (teacher != null)
                {
                    entities.Entry(teacher).State = EntityState.Deleted;
                    entities.StudentsClasses.Remove(teacher);
                    entities.SaveChanges();
                }
            }
            catch (Exception)
            {

                throw;
            }
        }
        */
         
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