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
    public class TeachersClassesController : ApiController
    {
        private SMSEntities entities = new SMSEntities();

        // GET api/<controller>
        [Route("api/TeachersClasses/All/{TeacherID}")]
        //public IEnumerable<TeachersClasses> Get()
        public HttpResponseMessage Get(int TeacherID)
        {
            entities.Configuration.ProxyCreationEnabled = false;

            var query = entities.TeachersClasses//.Include("Classes").Include("Shifts");
                //query.Include("Sections")
            .Where(t => t.TeacherID == TeacherID)
            .Select(e => new
            {
                e.TeacherClassID,
                e.TeacherID,
                Id = e.TeacherID,
                Name = e.Teachers.Name,
                NameAr = e.Teachers.Name,
                e.ClassID,
                ClassCode = e.Classes.Code,
                ClassName = e.Classes.Name,
                ClassNameAr = e.Classes.NameAr
            });

            //return query.ToList(); //entities.TeachersClasses.Include("Classes").Include("Shifts").Include("Sections");
            return this.Request.CreateResponse(HttpStatusCode.OK, query.ToList());
        }

        [Route("api/TeachersClasses/ByClassID/{ClassID}")]
        //public IEnumerable<TeachersClasses> Get()
        public HttpResponseMessage GetByClassID(int ClassID)
        {
            entities.Configuration.ProxyCreationEnabled = false;

            var query = entities.TeachersClasses 
                .Where(t => t.ClassID == ClassID)
                .Select(e => new
                {
                    e.TeacherClassID,
                    e.TeacherID,
                    Id = e.TeacherID,
                    Name = e.Teachers.Name,
                    NameAr = e.Teachers.Name,
                    e.ClassID,
                    ClassCode = e.Classes.Code,
                    ClassName = e.Classes.Name,
                    ClassNameAr = e.Classes.NameAr
                });
            return this.Request.CreateResponse(HttpStatusCode.OK, query.ToList());
        }


        //// GET api/<controller>/5/1/2
        //[Route("api/TeachersClasses/{ShiftId}/{ClassId}/{SectionId}")]
        //public TeachersClasses Get(int ShiftId, int ClassId, int SectionId)
        //{
        //    entities.Configuration.ProxyCreationEnabled = false;
         
        //    TeachersClasses TeacherClass = entities.TeachersClasses
        //        .Where(t => t.ShiftID == ShiftId && t.ClassID == ClassId && t.SectionID == SectionId).FirstOrDefault();

        //    if (TeacherClass == null)
        //    {
        //        TeacherClass = new TeachersClasses() { ClassID = 0 };
        //    }

        //    return TeacherClass;
        //}

        //[Route("api/TeachersClassesById/{id}")]
        //public TeachersClasses Get(int id)
        //{
        //    entities.Configuration.ProxyCreationEnabled = false;
        //    return entities.TeachersClasses.Where(t => t.TeacherClassID == id).FirstOrDefault();
        //}

        // POST api/<controller>
        [Route("api/TeachersClasses/{TeacherID}/{ClassIDs}")]
        public HttpResponseMessage Post(int TeacherID, string ClassIDs)
        {
            try
            {
                foreach (string ID in ClassIDs.Split(','))
                {
                    entities.TeachersClasses.Add(new TeachersClasses()
                    {
                        TeacherID = TeacherID,
                        ClassID = Convert.ToInt32(ID)
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

        //public HttpResponseMessage Post(TeachersClasses teacher)
        //{
        //    try
        //    {
        //        entities.TeachersClasses.Add(new TeachersClasses()
        //        {
        //            TeacherID = teacher.TeacherID,
        //            ClassID = teacher.ClassID
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
        public void Put(TeachersClasses TeacherClass)
        {
            try
            {
                var entity = entities.TeachersClasses.Find(TeacherClass.TeacherClassID);
                if (entity != null)
                {
                    entities.Entry(entity).CurrentValues.SetValues(TeacherClass);
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
                var teacher = new TeachersClasses { TeacherID = id };
                if (teacher != null)
                {
                    entities.Entry(teacher).State = EntityState.Deleted;
                    entities.TeachersClasses.Remove(teacher);
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
        [Route("api/RemoveTeacherClass/{id}")]
        public HttpResponseMessage RemoveTeacherClass(int id)
        {
            try
            {
                var TeacherClass = new TeachersClasses {  TeacherClassID = id };
                if (TeacherClass != null)
                {
                    entities.Entry(TeacherClass).State = EntityState.Deleted;
                    entities.TeachersClasses.Remove(TeacherClass);
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