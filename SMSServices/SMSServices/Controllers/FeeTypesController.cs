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
    public class FeeTypesController : ApiController
    {
        private SMSEntities entities = new SMSEntities();
        
        [HttpGet]
        [Route("api/GetFeeTypeGeneratedCode/")]
        public string GetFeeTypeGeneratedCode()
        {
            return new AutoCodeGeneration().GenerateCode("FeeTypes", "Code");
        }

        // GET api/<controller>
        [Route("api/FeeTypes/All")]
        //public IEnumerable<FeeTypes> Get()
        public HttpResponseMessage Get()
        {
            entities.Configuration.ProxyCreationEnabled = false;

            var query = entities.FeeTypes//.Include("Classes").Include("Shifts");
                //query.Include("Sections")
            .Select(e => new
            {
                e.FeeTypeID,
                e.Code,
                e.Name,
                e.NameAr,
                e.FeeCycleID,
                FeeCycleName= e.FeeCycles.Name,
                FeeCycleNameAr = e.FeeCycles.NameAr,
                e.FeeDueOnFrequencyID,
                FeeDueOnFrequencyName = e.FeeDueOnFrequencies.Name,
                FeeDueOnFrequencyNameAr = e.FeeDueOnFrequencies.NameAr,
                e.FeeDueOnIntervalID,
                FeeDueOnIntervalName = e.FeeDueOnInterval.Name,
                FeeDueOnIntervalNameAr = e.FeeDueOnInterval.NameAr,
                e.FeeDiscountTypeID,
                FeeDiscountTypeName =e.FeeDiscountTypes !=null ? e.FeeDiscountTypes.Name : "",
                FeeDiscountTypeNameAr =e.FeeDiscountTypes !=null ?  e.FeeDiscountTypes.NameAr: "",
                DiscountOption = e.DiscountOption.Equals ("P") ? "%" : "FixedText",
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

            //return query.ToList(); //entities.FeeTypes.Include("Classes").Include("Shifts").Include("Sections");
            return this.Request.CreateResponse(HttpStatusCode.OK, query.ToList());
        }

        //// GET api/<controller>/5/1/2
        //[Route("api/FeeTypes/{ShiftId}/{ClassId}/{SectionId}")]
        //public FeeTypes Get(int ShiftId, int ClassId, int SectionId)
        //{
        //    entities.Configuration.ProxyCreationEnabled = false;
         
        //    FeeTypes ClassSection = entities.FeeTypes
        //        .Where(t => t.ShiftID == ShiftId && t.ClassID == ClassId && t.SectionID == SectionId).FirstOrDefault();

        //    if (ClassSection == null)
        //    {
        //        ClassSection = new FeeTypes() { ClassID = 0 };
        //    }

        //    return ClassSection;
        //}

        //// GET api/<controller>/5
        //[Route("api/GetClassesByShiftId/{ShiftId}")]
        //[HttpGet]
        //public HttpResponseMessage GetClassesByShiftId(int ShiftId)
        //{
        //    entities.Configuration.ProxyCreationEnabled = false;

        //    FeeTypes ClassSection = entities.FeeTypes
        //        .FirstOrDefault();

        //    var query = entities.FeeTypes
        //        .Where(t => t.ShiftID == ShiftId)
        //        .Select(e => new
        //        {   
        //            Id = e.ClassID,
        //            Name = e.Classes.Name,
        //            NameAr = e.Classes.NameAr
        //        });
             
        //    return this.Request.CreateResponse(HttpStatusCode.OK, query.ToList().Distinct());
        //}

        //// GET api/<controller>/5
        //[Route("api/GetClassesByShiftIdClassId/{ShiftId}/{ClassId}")]
        //[HttpGet]
        //public HttpResponseMessage GetClassesByShiftIdClassId(int ShiftId, int ClassId)
        //{
        //    entities.Configuration.ProxyCreationEnabled = false;

        //    FeeTypes ClassSection = entities.FeeTypes
        //        .FirstOrDefault();

        //    var query = entities.FeeTypes
        //        .Where(t => t.ShiftID == ShiftId && t.ClassID == ClassId)
        //        .Select(e => new
        //        {
        //            Id = e.SectionID,
        //            Name = e.Sections.Name,
        //            NameAr = e.Sections.NameAr
        //        });

        //    return this.Request.CreateResponse(HttpStatusCode.OK, query.ToList());
        //}

        [Route("api/FeeTypesById/{id}")]
        public FeeTypes Get(int id)
        {
            entities.Configuration.ProxyCreationEnabled = false;
            //Teachers teacher = entities.Teachers.Where(t => t.TeacherId == id).FirstOrDefault();
            //if (teacher != null) { teacher.DOB = teacher.DOB.HasValue ? DateTime.Now.Date : (DateTime?)null; }
            return entities.FeeTypes.Where(t => t.FeeTypeID == id).FirstOrDefault();
        }

        // POST api/<controller>
        public HttpResponseMessage Post(FeeTypes feeType)
        {
            try
            {
                decimal DiscountRate =0;
                decimal DiscountValue = 0;
                string DiscountOption = "P";
                decimal NetFee = feeType.Fee;

                  if (feeType.FeeDiscountTypeID != null)
                  {
                      DiscountRate = feeType.DiscountRate;
                      DiscountValue = feeType.DiscountOption.Equals("P") ? feeType.Fee * feeType.DiscountRate / 100 : feeType.DiscountRate;
                      DiscountOption = feeType.DiscountOption;
                      NetFee = feeType.Fee - DiscountValue < 0 ? 0 : feeType.Fee - DiscountValue;
                  }


                entities.FeeTypes.Add(new FeeTypes()
                {
                    Code = new AutoCodeGeneration().GenerateCode("FeeTypes", "Code"),  // feeType.Code,
                    Name = feeType.Name,
                    NameAr = feeType.NameAr,
                    FeeCycleID = feeType.FeeCycleID,
                    FeeDueOnFrequencyID = feeType.FeeDueOnFrequencyID,
                    FeeDueOnIntervalID = feeType.FeeDueOnIntervalID,
                    Fee = feeType.Fee,
                    FeeDiscountTypeID = feeType.FeeDiscountTypeID,
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
        public void Put(FeeTypes ClassSection)
        {
            try
            {
                var entity = entities.FeeTypes.Find(ClassSection.FeeTypeID);
                if (entity != null)
                {
                    entities.Entry(entity).CurrentValues.SetValues(ClassSection);
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
                var teacher = new FeeTypes { TeacherId = id };
                if (teacher != null)
                {
                    entities.Entry(teacher).State = EntityState.Deleted;
                    entities.FeeTypes.Remove(teacher);
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
        [Route("api/RemoveFeeType/{id}")]
        public HttpResponseMessage RemoveClassSection(int id)
        {
            try
            {
                var ClassSection = new FeeTypes { FeeTypeID = id };
                if (ClassSection != null)
                {
                    entities.Entry(ClassSection).State = EntityState.Deleted;
                    entities.FeeTypes.Remove(ClassSection);
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