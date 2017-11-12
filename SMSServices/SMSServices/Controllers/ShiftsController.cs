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
    public class ShiftsController : ApiController
    {
        private SMSEntities entities = new SMSEntities();

        // GET api/<controller>
        public IEnumerable<Shifts> Get()
        {
            entities.Configuration.ProxyCreationEnabled = false;
            return entities.Shifts;
        }

        // GET api/<controller>/5
        public Shifts Get(int id)
        {
            entities.Configuration.ProxyCreationEnabled = false;
            //Shifts shift = entities.Shifts.Where(t => t.ID == id).FirstOrDefault();
            //if (shift != null) { shift.DOB = shift.DOB.HasValue ? DateTime.Now.Date : (DateTime?)null; }
            return entities.Shifts.Where(t => t.ID == id).FirstOrDefault();
        }
         
        // POST api/<controller>
        public HttpResponseMessage Post(Shifts shift)
        {
            try
            {
                entities.Shifts.Add(new Shifts()
                {
                    Name = shift.Name,
                    //Email = shift.Email,
                    //DOB = shift.DOB,
                    //Gender = shift.Gender,
                    //IDNo = shift.IDNo,
                    //NationalityId = shift.NationalityId,
                    //Rating = shift.Rating,
                    //Address = shift.Address,
                    //PhoneNo = shift.PhoneNo,
                    //MobileNo = shift.MobileNo,
                    //CountryId = shift.CountryId,
                    //StateId = shift.StateId,
                    //CityId = shift.CityId
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
        public void Put(Shifts shift)
        {
            try
            {
                var entity = entities.Shifts.Find(shift.ID);
                if (entity != null)
                {
                    entities.Entry(entity).CurrentValues.SetValues(shift);
                    entities.SaveChanges();
                }
                //var result = entities.Shifts.SingleOrDefault(t => t.ID == shift.ID);
                //if (result != null)
                //{
                //    //int a = Convert.ToInt32("aaa");
                //    result.Name = shift.Name;
                //    result.Email = shift.Email;
                //    result.DOB = shift.DOB;
                //    result.Gender = shift.Gender;
                //    result.IDNo = shift.IDNo;
                //    result.NationalityId = shift.NationalityId;
                //    result.Rating = shift.Rating;

                //    entities.Shifts.Attach(result);
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
                var shift = new Shifts { ID = id };
                if (shift != null)
                {
                    entities.Entry(shift).State = EntityState.Deleted;
                    entities.Shifts.Remove(shift);
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
        [Route("api/RemoveShift/{id}")]
        public HttpResponseMessage RemoveShift(int id)
        {
            try
            {
                var shift = new Shifts { ID = id };
                if (shift != null)
                {
                    entities.Entry(shift).State = EntityState.Deleted;
                    entities.Shifts.Remove(shift);
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