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
    public class FeeStructuresController : ApiController
    {
        private SMSEntities entities = new SMSEntities();
         
        // GET api/<controller>
        [Route("api/FeeStructures/All")]
        //public IEnumerable<FeeStructures> Get()
        public HttpResponseMessage Get()
        {
            entities.Configuration.ProxyCreationEnabled = false;

            var query = entities.FeeStructures//.Include("Classes").Include("Shifts");
                //query.Include("Sections")
            .Select(e => new
            {
                e.FeeStructureID,
                e.ClassID,
                ClassName=e.Classes.Name,
                ClassNameAr=e.Classes.NameAr,
                FeeTypeCode = e.FeeTypes.Code,
                FeeTypeName = e.FeeTypes.Name,
                FeeTypeNameAr = e.FeeTypes.NameAr,
                e.FeeTypes.FeeCycleID,
                FeeCycleName = e.FeeTypes.FeeCycles.Name,
                FeeCycleNameAr = e.FeeTypes.FeeCycles.NameAr,
                e.FeeTypes.FeeDueOnFrequencyID,
                FeeDueOnFrequencyName = e.FeeTypes.FeeDueOnFrequencies.Name,
                FeeDueOnFrequencyNameAr = e.FeeTypes.FeeDueOnFrequencies.NameAr,
                e.FeeTypes.FeeDueOnIntervalID,
                FeeDueOnIntervalName = e.FeeTypes.FeeDueOnInterval.Name,
                FeeDueOnIntervalNameAr = e.FeeTypes.FeeDueOnInterval.NameAr,
                e.FeeDiscountTypeID,
                FeeDiscountTypeName = e.FeeDiscountTypes != null ? e.FeeDiscountTypes.Name : "",
                FeeDiscountTypeNameAr = e.FeeDiscountTypes != null ? e.FeeDiscountTypes.NameAr : "",
                DiscountOption = e.DiscountOption,
                DiscountOptionText = e.DiscountOption.Equals("P") ? "%" : "FixedText",
                e.DiscountRate,
                e.DiscountValue,
                e.Fee,
                e.NetFee,
                //e.ShiftID,
                //ShiftName = e.Shifts.Name,
                //ShiftNameAr = e.Shifts.NameAr,
                //e.ClassID,
                //ClassName = e.Classes.Name,
                //ClassNameAr = e.Classes.NameAr,
                //e.SectionID,
                //SectionName = e.Sections.Name,
                //SectionNameAr = e.Sections.NameAr
            });

            //return query.ToList(); //entities.FeeStructures.Include("Classes").Include("Shifts").Include("Sections");
            return this.Request.CreateResponse(HttpStatusCode.OK, query.ToList());
        }


        //[Route("api/FeeStructuresById/{lang}/{id}")]
        //public HttpResponseMessage Get(string lang, int id)
        [Route("api/FeeStructuresById/{id}")]
        public HttpResponseMessage Get(int id)
        {
            entities.Configuration.ProxyCreationEnabled = false;
            //Teachers teacher = entities.Teachers.Where(t => t.TeacherId == id).FirstOrDefault();
            //if (teacher != null) { teacher.DOB = teacher.DOB.HasValue ? DateTime.Now.Date : (DateTime?)null; } 
            var query = entities.FeeStructures
                .Where(t => t.FeeStructureID == id)
                .Select(e => new
            {
                e.FeeStructureID,
                e.ClassID,
                ClassName = e.Classes.Name,
                ClassNameAr = e.Classes.NameAr,
                FeeTypeCode = e.FeeTypes.Code,
                FeeTypeName = e.FeeTypes.Name,
                FeeTypeNameAr = e.FeeTypes.NameAr,
                e.FeeTypes.FeeCycleID,
                FeeCycleName = e.FeeTypes.FeeCycles.Name,
                FeeCycleNameAr = e.FeeTypes.FeeCycles.NameAr,
                e.FeeTypes.FeeDueOnFrequencyID,
                FeeDueOnFrequencyName = e.FeeTypes.FeeDueOnFrequencies.Name,
                FeeDueOnFrequencyNameAr = e.FeeTypes.FeeDueOnFrequencies.NameAr,
                e.FeeTypes.FeeDueOnIntervalID,
                FeeDueOnIntervalName = e.FeeTypes.FeeDueOnInterval.Name,
                FeeDueOnIntervalNameAr = e.FeeTypes.FeeDueOnInterval.NameAr,
                e.FeeDiscountTypeID,
                FeeDiscountTypeName = e.FeeDiscountTypes != null ? e.FeeDiscountTypes.Name : "",
                FeeDiscountTypeNameAr = e.FeeDiscountTypes != null ? e.FeeDiscountTypes.NameAr : "",
                DiscountOption = e.DiscountOption,
                DiscountOptionText = e.DiscountOption.Equals("P") ? "%" : "FixedText",
                e.DiscountRate,
                e.DiscountValue,
                e.Fee,
                e.NetFee
            });

            //return query.ToList(); //entities.FeeStructures.Include("Classes").Include("Shifts").Include("Sections");
            return this.Request.CreateResponse(HttpStatusCode.OK, query.FirstOrDefault());
        }

        // POST api/<controller>
        public HttpResponseMessage Post(FeeStructures feeStructure)
        {
            try
            {
                decimal DiscountRate = 0;
                decimal DiscountValue = 0;
                string DiscountOption = "P";
                decimal NetFee = feeStructure.Fee;

                  if (feeStructure.FeeDiscountTypeID != null)
                  {
                      DiscountRate = feeStructure.DiscountRate;
                      DiscountValue = feeStructure.DiscountOption.Equals("P") ? feeStructure.Fee * feeStructure.DiscountRate / 100 : feeStructure.DiscountRate;
                      DiscountOption = feeStructure.DiscountOption;
                      NetFee = feeStructure.Fee - DiscountValue < 0 ? 0 : feeStructure.Fee - DiscountValue;
                  }


                entities.FeeStructures.Add(new FeeStructures()
                {
                    ClassID = feeStructure.ClassID,
                    FeeTypeID = feeStructure.FeeTypeID, 
                    Fee = feeStructure.Fee,
                    FeeDiscountTypeID = feeStructure.FeeDiscountTypeID,
                    DiscountRate = DiscountRate,
                    DiscountValue = DiscountValue,
                    DiscountOption = DiscountOption,
                    NetFee = NetFee,
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
        public void Put(FeeStructures FeeStructure)
        {
            try
            {
                var entity = entities.FeeStructures.Find(FeeStructure.FeeStructureID);
                if (entity != null)
                {
                    entities.Entry(entity).CurrentValues.SetValues(FeeStructure);
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
                var teacher = new FeeStructures { TeacherId = id };
                if (teacher != null)
                {
                    entities.Entry(teacher).State = EntityState.Deleted;
                    entities.FeeStructures.Remove(teacher);
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
        [Route("api/RemoveFeeStructure/{id}")]
        public HttpResponseMessage RemoveFeeStructure(int id)
        {
            try
            {
                var FeeStructure = new FeeStructures { FeeStructureID = id };
                if (FeeStructure != null)
                {
                    entities.Entry(FeeStructure).State = EntityState.Deleted;
                    entities.FeeStructures.Remove(FeeStructure);
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