using SMSServices.Helper;
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
    public class FeeCollectionsController : ApiController
    {
        private SMSEntities entities = new SMSEntities();
         
        // GET api/<controller>
        [Route("api/FeeCollections/{shiftId}/{classId}/{sectionId}/{batchId}/{studentId}")]
        //public IEnumerable<FeeCollections> Get()
        public HttpResponseMessage Get(int? ShiftID, int? ClassID, int? SectionID, int? BatchID, int? StudentID)
        {
            entities.Configuration.ProxyCreationEnabled = false;

            //var query = entities.spFeeCollections;
            return this.Request.CreateResponse(HttpStatusCode.OK, entities.spFeeCollections(ShiftID, ClassID, SectionID, BatchID, StudentID));
        }

        // GET api/<controller>
        [HttpGet]
        [Route("api/FeeDueDetailsByStudentID/{lang}/{studentId}")]         //
        public HttpResponseMessage FeeDueDetailsByStudentID(string Lang, int StudentID)//
        {
            //string Lang = "us";
            entities.Configuration.ProxyCreationEnabled = false;

            //var query = entities.spFeeCollections;
            return this.Request.CreateResponse(HttpStatusCode.OK, entities.spFeeDueDetailsByStudentID(Lang, StudentID));
        }

        //[Route("api/FeeCollectionsById/{lang}/{id}")]
        //public HttpResponseMessage Get(string lang, int id)
        [Route("api/FeeCollectionsById/{id}")]
        public HttpResponseMessage Get(int id)
        {
            entities.Configuration.ProxyCreationEnabled = false;
            //Teachers teacher = entities.Teachers.Where(t => t.TeacherId == id).FirstOrDefault();
            //if (teacher != null) { teacher.DOB = teacher.DOB.HasValue ? DateTime.Now.Date : (DateTime?)null; } 
            var query = entities.FeeCollections
                .Where(t => t.FeeCollectionID == id)
                .Select(e => new
            {
                e.FeeCollectionID,
                //e.ClassID,
                //ClassName = e.Classes.Name,
                //ClassNameAr = e.Classes.NameAr,
                //FeeTypeCode = e.FeeTypes.Code,
                //FeeTypeName = e.FeeTypes.Name,
                //FeeTypeNameAr = e.FeeTypes.NameAr,
                //e.FeeTypes.FeeCycleID,
                //FeeCycleName = e.FeeTypes.FeeCycles.Name,
                //FeeCycleNameAr = e.FeeTypes.FeeCycles.NameAr,
                //e.FeeTypes.FeeDueOnFrequencyID,
                //FeeDueOnFrequencyName = e.FeeTypes.FeeDueOnFrequencies.Name,
                //FeeDueOnFrequencyNameAr = e.FeeTypes.FeeDueOnFrequencies.NameAr,
                //e.FeeTypes.FeeDueOnIntervalID,
                //FeeDueOnIntervalName = e.FeeTypes.FeeDueOnInterval.Name,
                //FeeDueOnIntervalNameAr = e.FeeTypes.FeeDueOnInterval.NameAr,
                //e.FeeDiscountTypeID,
                //FeeDiscountTypeName = e.FeeDiscountTypes != null ? e.FeeDiscountTypes.Name : "",
                //FeeDiscountTypeNameAr = e.FeeDiscountTypes != null ? e.FeeDiscountTypes.NameAr : "",
                //DiscountOption = e.DiscountOption,
                //DiscountOptionText = e.DiscountOption.Equals("P") ? "%" : "FixedText",
                //e.DiscountRate,
                //e.DiscountValue,
                //e.Fee,
                //e.NetFee
            });

            //return query.ToList(); //entities.FeeCollections.Include("Classes").Include("Shifts").Include("Sections");
            return this.Request.CreateResponse(HttpStatusCode.OK, query.FirstOrDefault());
        }

        [HttpGet]
        [Route("api/GenerateFeeCollections/{shiftId}/{classId}/{sectionId}/{batchId}/{feeStructureIds}/{studentId}")]
        public HttpResponseMessage GenerateFeeCollections(int ShiftID, int ClassID, int SectionID, int BatchID,string FeeStructureIDs, int? StudentID)
        {
            try
            {
                bool IsSaveChanges=false;
                string strLog = "";
                Batches batch;

                List<StudentsClasses> StudentClassCollection = new StudentsClassesController().GetByIDs(ShiftID, ClassID, SectionID, BatchID, StudentID);
                if (StudentClassCollection.Count > 0)
                {  
                    batch = new BatchesController().Get(BatchID);
                    foreach (StudentsClasses StudentClass in StudentClassCollection)
                    {
                        if (entities.FeeCollections.Where(x => x.StudentClassId == StudentClass.StudentClassId).Count() <= 0)
                        {
                            IsSaveChanges = true;
                            strLog = strLog + string.Format("{0} - {1} // ", StudentClass.ClassId, StudentClass.StudentClassId);

                            List<FeeStructures> FeeStructureCollection = new FeeStructuresController().FeeStructuresByClassId(StudentClass.ClassId, FeeStructureIDs);
                            List<FeeCollectionsDetails> FeeCollectionDetailCollection = CreateFeeCollectionDetails(FeeStructureCollection, batch);

                            strLog = strLog + string.Format("{0} - {1} - {2} // ", StudentClass.ClassId, StudentClass.StudentClassId, FeeCollectionDetailCollection.Count);

                            entities.FeeCollections.Add(new FeeCollections()
                            {
                                StudentClassId = StudentClass.StudentClassId,
                                FeeCollectionsDetails = FeeCollectionDetailCollection
                            });
                        }
                    }

                    if (IsSaveChanges) entities.SaveChanges();
                }
                
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

        private List<FeeCollectionsDetails> CreateFeeCollectionDetails(List<FeeStructures> FeeStructureCollection, Batches Batch)
        {
            List<FeeCollectionsDetails> result = new List<FeeCollectionsDetails>();
            List<FeeCollectionsAging> AgingCollection ;

            foreach (FeeStructures item in FeeStructureCollection)
            {
                AgingCollection = CreateFeeCollectionsAging(item, Batch);
                result.Add(new FeeCollectionsDetails()
                {
                    FeeStructureID = item.FeeStructureID,
                    Fee = item.Fee,
                    FeeDiscountTypeID = item.FeeDiscountTypeID,
                    DiscountRate = item.DiscountRate,
                    DiscountOption = item.DiscountOption,
                    DiscountValue = item.DiscountValue,
                    NetFee = item.NetFee,
                    FeeCollectionsAging = AgingCollection
                });
            }
            return result;
        }

        private List<FeeCollectionsAging> CreateFeeCollectionsAging(FeeStructures FeeStructure, Batches Batch)
        { 
            List<FeeCollectionsAging> result = new List<FeeCollectionsAging>();
            FeeCollectionsAging Aging;
            string FeeCycleCode = FeeStructure.FeeTypes.FeeCycles.Code.ToUpper();
            string FeeFreqCode = FeeStructure.FeeTypes.FeeDueOnFrequencies.Code.ToUpper();
            string FeeIntervalCode = FeeStructure.FeeTypes.FeeDueOnInterval.Code.ToUpper();

            int CycleFactor = FeeStructure.FeeTypes.FeeCycles.Factor;
            int Interval = Convert.ToInt32(FeeFreqCode.Replace("M", ""));
            int DueOnDay = FeeStructure.FeeTypes.FeeDueOnInterval.EndDay;
            decimal MonthlyFee = FeeStructure.NetFee / CycleFactor;
            //int Month = 1;

            DateTime DueOn= DateTime.Now;

            for (int i = 0; i < 12; )
            {
                Aging = new FeeCollectionsAging();

                DueOn = i == 0 ? new DateTime(Batch.StartDate.Year, Batch.StartDate.Month, DueOnDay) : DueOn.AddMonths(Interval);

                Aging.DueOn = DueOn;
                Aging.DueAmountAfterAddDisc = MonthlyFee * Interval; 
                Aging.AdditionalDiscount = 0;
                Aging.FeePaymentStatusID =1;


                result.Add(Aging);

                i += Interval;
            }

            //if (FeeStructure.FeeTypes.FeeCycles.Code.Equals("M"))
            //{
            //}
            //else if (FeeStructure.FeeTypes.FeeCycles.Code.Equals("Y"))
            //{
            //}


            return result;
        }

        //MakeFeePayment

        // POST api/<controller>
        public HttpResponseMessage Post(FeeCollections FeeCollection)
        {
            try
            {
                //decimal DiscountRate = 0;
                //decimal DiscountValue = 0;
                //string DiscountOption = "P";
                //decimal NetFee = FeeCollection.Fee;

                //  if (FeeCollection.FeeDiscountTypeID != null)
                //  {
                //      DiscountRate = FeeCollection.DiscountRate;
                //      DiscountValue = FeeCollection.DiscountOption.Equals("P") ? FeeCollection.Fee * FeeCollection.DiscountRate / 100 : FeeCollection.DiscountRate;
                //      DiscountOption = FeeCollection.DiscountOption;
                //      NetFee = FeeCollection.Fee - DiscountValue < 0 ? 0 : FeeCollection.Fee - DiscountValue;
                //  }


                //entities.FeeCollections.Add(new FeeCollections()
                //{
                //    //ClassID = FeeCollection.ClassID,
                //    //FeeTypeID = FeeCollection.FeeTypeID, 
                //    Fee = FeeCollection.Fee,
                //    FeeDiscountTypeID = FeeCollection.FeeDiscountTypeID,
                //    DiscountRate = DiscountRate,
                //    DiscountValue = DiscountValue,
                //    DiscountOption = DiscountOption,
                //    NetFee = NetFee,
                //});
                //entities.SaveChanges();
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
        public void Put(FeeCollections FeeCollection)
        {
            try
            {
                var entity = entities.FeeCollections.Find(FeeCollection.FeeCollectionID);
                if (entity != null)
                {
                    entities.Entry(entity).CurrentValues.SetValues(FeeCollection);
                    entities.SaveChanges();
                }
            }
            catch //(DbUpdateException)
            {
                throw;
            }
        }

        [HttpPut]
        [Route("api/UpdateFeeAging")]
        public HttpResponseMessage UpdateFeeAging(List<spFeeDueDetailsByStudentID_Result> FeeCollectionsAging)
        {
            string strLog = "";
            try
            {
                bool IsFeePaidSaved = false;
                bool IsFeePaidDeleted = false;
                bool IsSaveChanges = false;
                int PaymentID = 0;

                FeePayments FeePayment= new FeePayments();
                List<FeePaymentsDetails> FeePaymentsDetailsList = new List<FeePaymentsDetails>();
                int FeeCollectionID = FeeCollectionsAging.FirstOrDefault().FeeCollectionID;
                DateTime PaymentDate = FeeCollectionsAging.FirstOrDefault().PaymentDate;
                string PaymentComments = FeeCollectionsAging.FirstOrDefault().PaymentComments;
                int PaymentModeID = FeeCollectionsAging.FirstOrDefault().PaymentModeID;
                string FeeCollectedBy = FeeCollectionsAging.FirstOrDefault().FeeCollectedBy;

                strLog += " -- " + string.Format("FeeCollectionID={0}", FeeCollectionID);
                
                List<FeeCollectionsAging> entityFeeCollectionsAging = entities.FeeCollectionsAging
                                                                                    .Where(t => t.FeeCollectionsDetails.FeeCollectionID == FeeCollectionID).ToList();

                /* 
                 * delete has issue: because I loaded just pending payment records, so difficult to know record delete my user or not loaded by SP
                */
                //foreach (string ID in DueFeeIDsForDelete.Split(','))
                //{
                //    if (ID.Length > 0)
                //    {
                //        FeeCollectionsAging tt =entities. FeeCollectionsAging.FirstOrDefault(t => t.FeeCollectionAgingID == Convert.ToInt32("0" + ID));
                //        if (!(tt != null && tt.FeeCollectionAgingID > 0))
                //        {
                //            //strLog += " ---- " + string.Format(" inside delete tt.FeeCollectionAgingID={0}", item.FeeCollectionAgingID);
                //            entities.Entry(tt).State = EntityState.Deleted;
                //            entities.FeeCollectionsAging.Remove(tt);

                //            IsFeePaidDeleted = true;
                //        }
                //    }

                //}


                if (FeeCollectionsAging.Count > 0)
                {
                    //strLog += " ----- " + string.Format(" inside if FeeCollectionsAging.Count ={0}", FeeCollectionsAging.Count );
                    foreach (var feeCollectionAging in FeeCollectionsAging)
                    {
                        if (feeCollectionAging.FeeCollectionAgingID > 0) // Edit
                        {

                            var entity = entities.FeeCollectionsAging.Find(feeCollectionAging.FeeCollectionAgingID);
                            if (entity != null)
                            {
                                // change db values if there is addtional discount or paymentAmount.
                                if (feeCollectionAging.NewAdditionalDiscount > 0 || feeCollectionAging.PaymentAmount > 0)
                                {
                                    IsSaveChanges = true;
                                    //strLog += " ------ " + string.Format(" inside update feeCollectionAging.FeeCollectionAgingID={0}", feeCollectionAging.FeeCollectionAgingID);

                                    entity.AdditionalDiscount = entity.AdditionalDiscount + feeCollectionAging.NewAdditionalDiscount;
                                    entity.DueAmountAfterAddDisc = feeCollectionAging.DueAmountAfterAddDisc - feeCollectionAging.NewAdditionalDiscount;
                                    entity.TotalPaidAmount = (entity.TotalPaidAmount.HasValue ? entity.TotalPaidAmount.Value : 0) + feeCollectionAging.PaymentAmount;
                                    entity.FeePaymentStatusID = entity.TotalPaidAmount >= entity.DueAmountAfterAddDisc ? 3 : (entity.TotalPaidAmount > 0 ? 2 : 1);

                                    entities.Entry(entity).State = EntityState.Modified;

                                    // add payment db entry in case when there is paymentAmount
                                    if (feeCollectionAging.PaymentAmount > 0)
                                    {
                                        IsFeePaidSaved = true;
                                        FeePaymentsDetailsList.Add(new FeePaymentsDetails()
                                        {
                                            FeeCollectionAgingID = entity.FeeCollectionAgingID,
                                            PaidAmount = feeCollectionAging.PaymentAmount
                                        });
                                    }
                                    //entities.SaveChanges();
                                }
                            }
                        }
                        //else if (feeCollectionAging.FeeCollectionAgingID == 0) // Add
                        //{
                        //    entities.FeeCollectionsAging.Add(new FeeCollectionsAging()
                        //    {
                        //        FeeCollectionAgingID = TimeTableID,
                        //        DayID = DayID,
                        //        StartTime = feeCollectionAging.StartTime,
                        //        EndTime = feeCollectionAging.EndTime,
                        //        IsBreak = feeCollectionAging.IsBreak,
                        //        LocationID = feeCollectionAging.LocationID,
                        //        SubjectID = feeCollectionAging.SubjectID,
                        //        TeacherId = feeCollectionAging.TeacherId,
                        //        //ShiftID = timeTable.ShiftID,
                        //        //ClassID = timeTable.ClassID,
                        //        //SectionID = timeTable.SectionID,
                        //        //PeriodDurationMIns = timeTable.PeriodDurationMIns
                        //    });
                        //}
                    }

                    if (IsFeePaidSaved)
                    {
                        //FeePayments FeePayment = new FeePayments();
                        //FeePayment.FeePaymentsDetails = FeePaymentsDetailsList;
                        //FeePayment.Comments = "This is new comments ...";
                        //FeePayment.PaidOn = DateTime.Now;
                        //new FeePaymentsController().AddFeePayment(FeePayment);
                        strLog += " ------ " + string.Format(" IsFeePaidSaved={0}", IsFeePaidSaved);

                        decimal TotalPaidAmount = new FeePaymentsController().GetTotalPaidAmount(FeePaymentsDetailsList, ref  strLog);
                        decimal Outstanding = new FeePaymentsController().GetFeeOutstandingByAgingID(FeePaymentsDetailsList, ref strLog);
                         FeePayment =new FeePayments()
                        {
                            Code = new AutoCodeGeneration().GenerateCode("FeePayments", "Code"),
                            PaidOn = PaymentDate,
                            Comments = PaymentComments,
                            TotalPaidAmount = TotalPaidAmount,
                            Balance = Outstanding >= TotalPaidAmount ? Outstanding - TotalPaidAmount : 0,
                            FeePaymentsDetails = FeePaymentsDetailsList,
                            PaymentModeID = PaymentModeID,
                            FeeCollectedBy = FeeCollectedBy,
                            CreatedOn = DateTime.Now
                        };
                        entities.FeePayments.Add(FeePayment);
                    }

                }

                if (IsFeePaidDeleted || IsFeePaidSaved || IsSaveChanges)
                    entities.SaveChanges();

                if (IsFeePaidSaved)
                    PaymentID = FeePayment.FeePaymentID;

                return Request.CreateResponse(HttpStatusCode.OK, PaymentID);

                //var result = entities.FeeCollectionsAging.SingleOrDefault(t => t.TimeTableID == timeTable.TimeTableID);
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

                //    entities.FeeCollectionsAging.Attach(result);
                //    entities.Entry(result).State = System.Data.Entity.EntityState.Modified;
                //    entities.SaveChanges();
                //}
            }
            catch (DbEntityValidationException dbEx)
            {
                //throw dbEx;
                //return Request.CreateResponse(HttpStatusCode.BadRequest, "I have more issue ...");
                StringBuilder sb = new StringBuilder();
                foreach (var item in dbEx.EntityValidationErrors)
                {
                    sb.Append(item + " errors: ");
                    foreach (var i in item.ValidationErrors)
                    {
                        sb.Append(i.PropertyName + " : " + i.ErrorMessage);
                    }
                    sb.Append(Environment.NewLine);
                }
                //throw new ApiDataException(GetErrorCode(dbEx), sb.ToString(), HttpStatusCode.BadRequest);
                //throw new ApiDataException(1021, "too many errors ...", HttpStatusCode.BadRequest);
                //return Request.CreateResponse(HttpStatusCode.OK, sb.ToString());
                return Request.CreateResponse(HttpStatusCode.BadRequest, "I have some issue ... " + strLog + " --> " + dbEx.Message + " EntityValidationErrors = " + sb.ToString());
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, "I have some issue ... " + strLog + " --> " + ex.Message );
            }
        }

        /*
        // DELETE api/<controller>/5
        public void Delete(int id)
        {
            try
            {
                var teacher = new FeeCollections { TeacherId = id };
                if (teacher != null)
                {
                    entities.Entry(teacher).State = EntityState.Deleted;
                    entities.FeeCollections.Remove(teacher);
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
        [Route("api/RemoveFeeCollection/{id}")]
        public HttpResponseMessage RemoveFeeCollection(int id)
        {
            string strLog = "";
            int ID = 0;
            try
            {
                //var FeeCollection = new FeeCollections { FeeCollectionID = id };
                FeeCollections FeeCollection = entities.FeeCollections.FirstOrDefault(fc => fc.FeeCollectionID == id);
                if (FeeCollection != null)
                {
                    foreach (FeeCollectionsDetails FeeCollectionDetail in FeeCollection.FeeCollectionsDetails.ToList())
                    {
                        foreach (FeeCollectionsAging Aging in FeeCollectionDetail.FeeCollectionsAging.ToList())
                        {
                            foreach (FeePaymentsDetails FeePaymentDetail in Aging.FeePaymentsDetails.ToList())
                            {
                                if ( FeePaymentDetail.FeePayments!=null)
                                {
                                    entities.Entry(FeePaymentDetail.FeePayments).State = EntityState.Deleted;
                                }
                                
                                entities.Entry(FeePaymentDetail).State = EntityState.Deleted;

                                ID = FeePaymentDetail.FeePaymentID;
                            }
                            entities.Entry(Aging).State = EntityState.Deleted;
                            //entities.FeeCollectionsAging.Remove(Aging);
                            //entities.SaveChanges();
                            //strLog += " --- aging remove";
                        }
                        entities.Entry(FeeCollectionDetail).State = EntityState.Deleted;
                        //entities.FeeCollectionsDetails.Remove(FeeCollectionDetail);
                        //entities.SaveChanges();

                        //strLog += " --- FeeCollectionDetail remove";
                    }

                    entities.Entry(FeeCollection).State = EntityState.Deleted;
                    entities.FeeCollections.Remove(FeeCollection);
                    entities.SaveChanges();

                    //strLog += " --- FeeCollections remove";
                    return Request.CreateResponse(HttpStatusCode.OK, "Removed... " + strLog);
                }
                else
                    return Request.CreateResponse(HttpStatusCode.NotFound, "not found... " + strLog);

            }
            catch (Exception ex)
            {
                //return Request.CreateResponse(HttpStatusCode.BadRequest, strLog + " =+++= "+ ex.Message + " +++ " + ex.InnerException.Message);
                return Request.CreateResponse(HttpStatusCode.BadRequest, ex);
                //return Request.CreateResponse(HttpStatusCode.BadRequest, ex.Message + 
                //    " inner ex: " + ex.InnerException !=null ? ex.InnerException.Message : "null" );
                //throw;
            }
        }

        [HttpPost]
        [Route("api/RemoveFeeCollectionAging/{ids}")]
        public HttpResponseMessage RemoveFeeCollection(string IDs)
        {
            string strLog = ""; 
            bool  IsFeePaidDeleted = false;
            try
            {
                foreach (string FeeCollectionAgingID in IDs.Split(','))
                { 
                    if (FeeCollectionAgingID.Trim().Length > 0)
                    {
                        int id = Convert.ToInt32("0" + FeeCollectionAgingID.Trim());
                        FeeCollectionsAging tt = entities.FeeCollectionsAging.FirstOrDefault(t => t.FeeCollectionAgingID == id);
                        if (tt != null && tt.FeeCollectionAgingID > 0)
                        {
                            //strLog += " ---- " + string.Format(" inside delete tt.FeeCollectionAgingID={0}", item.FeeCollectionAgingID);
                            entities.Entry(tt).State = EntityState.Deleted;
                            entities.FeeCollectionsAging.Remove(tt);

                            IsFeePaidDeleted = true;
                        }
                    }

                }

                if (IsFeePaidDeleted)
                    entities.SaveChanges();

                //strLog += " --- FeeCollections remove";
                return Request.CreateResponse(HttpStatusCode.OK, "Removed... " + strLog);
            }

            catch (Exception ex)
            {
                //return Request.CreateResponse(HttpStatusCode.BadRequest, strLog + " =+++= "+ ex.Message + " +++ " + ex.InnerException.Message);
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