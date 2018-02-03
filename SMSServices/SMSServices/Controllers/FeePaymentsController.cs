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
    public class FeePaymentsController : ApiController
    {
        private SMSEntities entities = new SMSEntities();
        
        [HttpGet]
        [Route("api/FeePayments/GetGeneratedCode/")]
        public string GetStudentGeneratedCode()
        {
            return new AutoCodeGeneration().GenerateCode("FeePayments", "Code");
        }

        // GET api/<controller>
        public IEnumerable<FeePayments> Get()
        {
            entities.Configuration.ProxyCreationEnabled = false;
            return entities.FeePayments;
        }

        // GET api/<controller>/5
        public FeePayments Get(int id)
        {
            entities.Configuration.ProxyCreationEnabled = false;
            //FeePayments feePayment = entities.FeePayments.Where(t => t.FeePaymentID == id).FirstOrDefault();
            //if (feePayment != null) { feePayment.DOB = feePayment.DOB.HasValue ? DateTime.Now.Date : (DateTime?)null; }
            return entities.FeePayments.Where(t => t.FeePaymentID == id).FirstOrDefault();
        }


        // GET api/<controller>
        [HttpGet]
        [Route("api/FeePayments/FeePaymentByID/{lang}/{FeePaymentId}")]
        //public IEnumerable<FeeCollections> Get()
        public HttpResponseMessage FeePaymentByID(string Lang, int FeePaymentID)
        {
            entities.Configuration.ProxyCreationEnabled = false;
             
            return this.Request.CreateResponse(HttpStatusCode.OK, entities.spReportFeePaymentByID(Lang, FeePaymentID));
        }

        /*
        // POST api/<controller>
        public HttpResponseMessage Post(FeePayments feePayment)
        {
            string strLog = "";
            try
            {
                strLog = AddFeePayment(feePayment);
                entities.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK, "Done ... " + strLog);
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

        public string AddFeePayment(FeePayments feePayment)
        {
            string strLog = "";
            decimal TotalPaidAmount = GetTotalPaidAmount(feePayment,ref  strLog);
            decimal Outstanding = GetFeeOutstandingByAgingID(feePayment, ref strLog);

            strLog = strLog + string.Format("Outstanding {0} TotalPaidAmount {1} // ", Outstanding, TotalPaidAmount);

            entities.FeePayments.Add(new FeePayments()
            {
                Code = new AutoCodeGeneration().GenerateCode("FeePayments", "Code"),
                PaidOn = feePayment.PaidOn,
                Comments = "" + feePayment.Comments,
                TotalPaidAmount = TotalPaidAmount,
                Balance = Outstanding >= TotalPaidAmount ? Outstanding - TotalPaidAmount : 0,
                FeePaymentsDetails = feePayment.FeePaymentsDetails
            });

            return strLog;
        }
        */

        public decimal GetFeeOutstandingByAgingID(List<FeePaymentsDetails> FeePaymentsDetails, ref string strLog)
        {
            strLog = strLog + string.Format(" //  GetFeeOutstandingByAgingID ");
            if (FeePaymentsDetails.Count > 0)
            {

                int FeeCollectionAgingID = FeePaymentsDetails.FirstOrDefault().FeeCollectionAgingID;
                var result = entities.spFeeOutstandingByAgingID(FeeCollectionAgingID).FirstOrDefault();

                strLog = strLog + string.Format(" feePayment.FeePaymentsDetails.Count > 0 //  FeeCollectionAgingID = ", FeeCollectionAgingID);
                strLog = strLog + string.Format(" //  result.HasValue = ", result.HasValue);


                return (result != null) ? (result.HasValue? result.Value : 0) : 0;
            }
            else return 0; 
        }

        public decimal GetTotalPaidAmount(List<FeePaymentsDetails> FeePaymentsDetails, ref string strLog)
        {
            strLog = strLog + string.Format(" //  GetTotalPaidAmount ");
            var result = FeePaymentsDetails.GroupBy(o => o.FeePaymentID)
                               .Select(g => new { TotalPaidAmount = g.Sum(i => i.PaidAmount) }).FirstOrDefault();

            return (result != null) ? result.TotalPaidAmount : 0;
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
        public void Put(FeePayments feePayment)
        {
            try
            {
                var entity = entities.FeePayments.Find(feePayment.FeePaymentID);
                if (entity != null)
                {
                    entities.Entry(entity).CurrentValues.SetValues(feePayment);
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
                var feePayment = new FeePayments { FeePaymentID = id };
                if (feePayment != null)
                {
                    entities.Entry(feePayment).State = EntityState.Deleted;
                    entities.FeePayments.Remove(feePayment);
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
        [Route("api/RemoveFeePayment/{id}")]
        public HttpResponseMessage RemoveFeePayment(int id)
        {
            string strLog = "";
            try
            {
                var feePayment = new FeePayments { FeePaymentID = id };
                FeePayments FeePayment = entities.FeePayments.FirstOrDefault(fc => fc.FeePaymentID == id);
                if (FeePayment != null)
                {
                    if (new FeeCollectionsController().UpdateFeeAgingByFeePaymentDelete(FeePayment))
                    {
                        foreach (FeePaymentsDetails FeePaymentDetail in FeePayment.FeePaymentsDetails.ToList())
                        {

                            entities.Entry(FeePaymentDetail).State = EntityState.Deleted;
                            //strLog += " --- FeePaymentDetail remove";
                        }

                        entities.Entry(FeePayment).State = EntityState.Deleted;
                        entities.FeePayments.Remove(FeePayment);
                        entities.SaveChanges();
                    }
                    //strLog += " --- FeePayments remove";
                    return Request.CreateResponse(HttpStatusCode.OK, "Removed... " + strLog);
                }
                else
                    return Request.CreateResponse(HttpStatusCode.NotFound, "not found... " + strLog); 

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