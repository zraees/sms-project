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
    public class TimeTablesController : ApiController
    {
        private SMSEntities entities = new SMSEntities();

        [HttpGet]
        [Route("api/GetTimeTableGeneratedCode/")]
        public string GetTimeTableGeneratedCode()
        {
            return new AutoCodeGeneration().GenerateCode("TimeTables", "Code");
        }

        // GET api/<controller>
        public HttpResponseMessage Get()
        {
            entities.Configuration.ProxyCreationEnabled = false;
            //return entities.TimeTables;
            var query = entities.TimeTables 
            .Select(e => new
            {
                e.TimeTableID,
                e.Code,
                Name = e.Name,
                e.ShiftID,
                ShiftName = e.Shifts.Name,
                ShiftNameAr = e.Shifts.NameAr,

                e.ClassID,
                ClassName = e.Classes.Name,
                ClassNameAr = e.Classes.NameAr,
                
                e.SectionID,
                SectionName = e.Sections.Name,
                SectionNameAr = e.Sections.NameAr,
            });

            //return query.ToList(); //entities.TeachersSubjects.Include("Classes").Include("Shifts").Include("Sections");
            return this.Request.CreateResponse(HttpStatusCode.OK, query.ToList());
        }

        // GET api/<controller>/5
        public TimeTables Get(int id)
        {
            entities.Configuration.ProxyCreationEnabled = false;
            //TimeTables timeTable = entities.TimeTables.Where(t => t.TimeTableID == id).FirstOrDefault();
            //if (timeTable != null) { timeTable.DOB = timeTable.DOB.HasValue ? DateTime.Now.Date : (DateTime?)null; }
            return entities.TimeTables.Where(t => t.TimeTableID == id).FirstOrDefault();
        }

        // POST api/<controller>
        public HttpResponseMessage Post(TimeTables timeTable)
        {
            try
            {
                entities.TimeTables.Add(new TimeTables()
                {
                    Code = new AutoCodeGeneration().GenerateCode("TimeTables", "Code"),  //timeTable.Code,
                    Name = timeTable.Name,
                    ShiftID = timeTable.ShiftID,
                    ClassID = timeTable.ClassID,
                    SectionID = timeTable.SectionID,
                    PeriodDurationMIns = timeTable.PeriodDurationMIns
                });
                entities.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK, "Done ...");
                //return Request.CreateResponse(HttpStatusCode.BadRequest, "I have some issue ...");
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
        public void Put(TimeTables timeTable)
        {
            try
            {
                var entity = entities.TimeTables.Find(timeTable.TimeTableID);
                if (entity != null)
                {
                    entities.Entry(entity).CurrentValues.SetValues(timeTable);
                    entities.SaveChanges();
                }
                //var result = entities.TimeTables.SingleOrDefault(t => t.TimeTableID == timeTable.TimeTableID);
                //if (result != null)
                //{
                //    //int a = Convert.ToInt32("aaa");
                //    result.Name = timeTable.Name;
                //    result.Email = timeTable.Email;
                //    result.DOB = timeTable.DOB;
                //    result.Gender = timeTable.Gender;
                //    result.IDNo = timeTable.IDNo;
                //    result.NationalityId = timeTable.NationalityId;
                //    result.Rating = timeTable.Rating;

                //    entities.TimeTables.Attach(result);
                //    entities.Entry(result).State = System.Data.Entity.EntityState.Modified;
                //    entities.SaveChanges();
                //}
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
                var timeTable = new TimeTables { TimeTableID = id };
                if (timeTable != null)
                {
                    entities.Entry(timeTable).State = EntityState.Deleted;
                    entities.TimeTables.Remove(timeTable);
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
        [Route("api/RemoveTimeTable/{id}")]
        public HttpResponseMessage RemoveTimeTable(int id)
        {
            try
            {
                var timeTable = new TimeTables { TimeTableID = id };
                if (timeTable != null)
                {
                    entities.Entry(timeTable).State = EntityState.Deleted;
                    entities.TimeTables.Remove(timeTable);
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