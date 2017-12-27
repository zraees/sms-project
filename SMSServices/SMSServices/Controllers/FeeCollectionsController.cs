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
        [Route("api/FeeCollections/All")]
        //public IEnumerable<FeeCollections> Get()
        public HttpResponseMessage Get()
        {
            entities.Configuration.ProxyCreationEnabled = false;

            var query = entities.FeeCollections//.Include("Classes").Include("Shifts");
                //query.Include("Sections")
            .Select(e => new
            {
                e.FeeCollectionID,
                //e.ClassID,
                //ClassName=e.Classes.Name,
                //ClassNameAr=e.Classes.NameAr,
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
                //e.NetFee,
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

            //return query.ToList(); //entities.FeeCollections.Include("Classes").Include("Shifts").Include("Sections");
            return this.Request.CreateResponse(HttpStatusCode.OK, query.ToList());
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
        [Route("api/GenerateFeeCollections/{shiftId}/{classId}/{sectionId}/{batchId}/{studentId}")]
        public HttpResponseMessage GenerateFeeCollections(int ShiftID, int ClassID, int SectionID, int BatchID, int? StudentID)
        {
            try
            {
                //bool IsBreak;
                string strLog = "";

                List<StudentsClasses> StudentClassCollection = new StudentsClassesController().GetByIDs(ShiftID, ClassID, SectionID, BatchID, StudentID);
                if (StudentClassCollection.Count > 0)
                {
                    foreach (StudentsClasses StudentClass in StudentClassCollection)
                    {
                        strLog = strLog + string.Format("{0} - {1} // ", StudentClass.ClassId, StudentClass.StudentClassId);

                        List<FeeStructures> FeeStructureCollection = new FeeStructuresController().FeeStructuresByClassId(StudentClass.ClassId);
                        List<FeeCollectionsDetails> FeeCollectionDetailCollection = CreateFeeCollectionDetails(FeeStructureCollection);

                        strLog = strLog + string.Format("{0} - {1} - {2} // ", StudentClass.ClassId, StudentClass.StudentClassId, FeeCollectionDetailCollection.Count);

                        entities.FeeCollections.Add(new FeeCollections()
                        {
                            StudentClassId = StudentClass.StudentClassId,
                            FeeCollectionsDetails = FeeCollectionDetailCollection
                        });
                    }
                    entities.SaveChanges();
                }
                //TimeTables TimeTable = entities.TimeTables.Include("Shifts").FirstOrDefault(t => t.TimeTableID == TimeTableID);
                //if (TimeTable != null && TimeTable.TimeTableID > 0)
                //{
                //    TimeSpan ShiftDifference = TimeTable.Shifts.EndTime - TimeTable.Shifts.StartTime;

                //    //return Request.CreateResponse(HttpStatusCode.OK, ShiftDifference.TotalMinutes/TimeTable.PeriodDurationMIns);
                //    for (int index = 0; index < ShiftDifference.TotalMinutes; )
                //    {
                //        if (index == 0)
                //        {
                //            TimeIn = TimeTable.Shifts.StartTime.Add(new TimeSpan(0, index, 0));
                //            index = index + TimeTable.PeriodDurationMIns;
                //            TimeOut = TimeTable.Shifts.StartTime.Add(new TimeSpan(0, index, 0));
                //        }
                //        else
                //        {
                //            TimeIn = TimeTable.Shifts.StartTime.Add(new TimeSpan(0, index + 1, 0));
                //            index = index + TimeTable.PeriodDurationMIns;
                //            TimeOut = TimeTable.Shifts.StartTime.Add(new TimeSpan(0, index, 0));
                //        }

                //        strLog = strLog + string.Format(" [ {0}  *  {1} = {2} ] ", Math.Abs((TimeIn - TimeTable.Shifts.BreakStartTime).TotalMinutes),
                //            Math.Abs((TimeTable.Shifts.BreakEndTime - TimeOut).TotalMinutes),
                //             (Math.Abs((TimeIn - TimeTable.Shifts.BreakStartTime).TotalMinutes) + Math.Abs((TimeTable.Shifts.BreakEndTime - TimeOut).TotalMinutes)));

                //        IsBreak = (Math.Abs((TimeIn - TimeTable.Shifts.BreakStartTime).TotalMinutes) + Math.Abs((TimeTable.Shifts.BreakEndTime - TimeOut).TotalMinutes)) <= 5 ? true : false;

                //        entities.TimeTableDetails.Add(new TimeTableDetails()
                //        {
                //            TimeTableID = TimeTableID,
                //            DayID = DayID,
                //            StartTime = TimeIn,
                //            EndTime = TimeOut,
                //            IsBreak = IsBreak
                //            //ShiftID = timeTable.ShiftID,
                //            //ClassID = timeTable.ClassID,
                //            //SectionID = timeTable.SectionID,
                //            //PeriodDurationMIns = timeTable.PeriodDurationMIns
                //        });
                //    }
                //    entities.SaveChanges();
                //}
                //entities.TimeTableDetails.Add(new TimeTableDetails()
                //{
                //    TimeTableID = TimeTableID,
                //    //ShiftID = timeTable.ShiftID,
                //    //ClassID = timeTable.ClassID,
                //    //SectionID = timeTable.SectionID,
                //    //PeriodDurationMIns = timeTable.PeriodDurationMIns
                //});
                //entities.SaveChanges();
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

        private List<FeeCollectionsDetails> CreateFeeCollectionDetails(List<FeeStructures> FeeStructureCollection)
        {
            List<FeeCollectionsDetails> result = new List<FeeCollectionsDetails>();
            foreach (FeeStructures item in FeeStructureCollection)
            {
                result.Add(new FeeCollectionsDetails()
                {
                    FeeStructureID = item.FeeStructureID,
                    Fee = item.Fee,
                    FeeDiscountTypeID = item.FeeDiscountTypeID,
                    DiscountRate = item.DiscountRate,
                    DiscountOption = item.DiscountOption,
                    DiscountValue = item.DiscountValue,
                    NetFee = item.NetFee
                });
            }
            return result;
        }

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
            try
            {
                var FeeCollection = new FeeCollections { FeeCollectionID = id };
                if (FeeCollection != null)
                {
                    entities.Entry(FeeCollection).State = EntityState.Deleted;
                    entities.FeeCollections.Remove(FeeCollection);
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