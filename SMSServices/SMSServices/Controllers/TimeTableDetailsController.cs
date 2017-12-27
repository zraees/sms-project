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
    public class TimeTableDetailsController : ApiController
    {
        private SMSEntities entities = new SMSEntities();
         
        // GET api/<controller>
        public HttpResponseMessage Get()
        {
            entities.Configuration.ProxyCreationEnabled = false;
            //return entities.TimeTableDetails;
            var query = entities.TimeTableDetails
            .Select(e => new
            {
                e.TimeTableID,
                //e.Code,
                //Name = e.Name,
                //PeriodDurationMIns = e.PeriodDurationMIns,

                //e.ShiftID,
                //ShiftName = e.Shifts.Name,
                //ShiftNameAr = e.Shifts.NameAr,
                //StartTime = e.Shifts.StartTime,
                //EndTime = e.Shifts.EndTime,
                //BreakStartTime = e.Shifts.BreakStartTime,
                //BreakEndTime = e.Shifts.BreakEndTime,

                //e.ClassID,
                //ClassName = e.Classes.Name,
                //ClassNameAr = e.Classes.NameAr,

                //e.SectionID,
                //SectionName = e.Sections.Name,
                //SectionNameAr = e.Sections.NameAr,
            });
             
            return this.Request.CreateResponse(HttpStatusCode.OK, query.ToList());
        }

        // GET api/<controller>/5
        public HttpResponseMessage Get(int id)
        {
            entities.Configuration.ProxyCreationEnabled = false; 
            var query = entities.TimeTableDetails.Where(t => t.TimeTableDetailID == id)
            .Select(e => new
            {
                e.TimeTableDetailID,
                e.TimeTableID,
                e.StartTime,
                e.EndTime,
                e.IsBreak,

                e.DayID,
                DayName = e.Days.Name,
                DayNameAr = e.Days.NameAr,
                IsWeekend = e.Days.IsWeekend,

                e.LocationID,
                LocationName = e.Locations.Name,
                LocationNameAr = e.Locations.NameAr,

                e.SubjectID,
                SubjectName = e.Subjects.Name,
                SubjectNameAr = e.Subjects.NameAr,

                e.TeacherId,
                TeacherName = e.Teachers.Name,
                //TeacherNameAr = e.Teachers.NameAr,
                 
                TimeTableCode = e.TimeTables.Code,
                TimeTableName = e.TimeTables.Name,
                TimeTablePeriodDurationMIns = e.TimeTables.PeriodDurationMIns,

                e.TimeTables.ShiftID,
                ShiftName = e.TimeTables.Shifts.Name,
                ShiftNameAr = e.TimeTables.Shifts.NameAr,
                ShiftStartTime = e.TimeTables.Shifts.StartTime,
                ShiftEndTime = e.TimeTables.Shifts.EndTime,
                ShiftBreakStartTime = e.TimeTables.Shifts.BreakStartTime,
                ShiftBreakEndTime = e.TimeTables.Shifts.BreakEndTime,

                e.TimeTables.ClassID,
                ClassName = e.TimeTables.Classes.Name,
                ClassNameAr = e.TimeTables.Classes.NameAr,

                e.TimeTables.SectionID,
                SectionName = e.TimeTables.Sections.Name,
                SectionNameAr = e.TimeTables.Sections.NameAr,

            }).FirstOrDefault(); 
            return this.Request.CreateResponse(HttpStatusCode.OK, query);
        }


        [Route("api/GetTimeTableDetailByTimeTableIDDayID/{TimeTableID}/{DayID}")]
        public HttpResponseMessage GetTimeTableDetailByTimeTableIDDayID(int TimeTableID, int DayID)
        {
            entities.Configuration.ProxyCreationEnabled = false;

            //
            TimeTableDetails obj = entities.TimeTableDetails.FirstOrDefault(t => t.TimeTableID == TimeTableID && t.DayID == DayID);
            if (obj != null && obj.TimeTableDetailID > 0) 
            {
                //
            }
            else
            { CreateEmptyTimeTableDetails(TimeTableID, DayID); }

            var query = entities.TimeTableDetails.Where(t => t.TimeTableID == TimeTableID && t.DayID == DayID)
            .Select(e => new
            {
                e.TimeTableDetailID,
                e.TimeTableID,
                e.StartTime,
                e.EndTime,
                e.IsBreak,

                e.DayID,
                DayName = e.Days.Name,
                DayNameAr = e.Days.NameAr,
                IsWeekend = e.Days.IsWeekend,

                e.LocationID,
                LocationName = e.Locations.Name,
                LocationNameAr = e.Locations.NameAr,

                e.SubjectID,
                SubjectName = e.Subjects.Name,
                SubjectNameAr = e.Subjects.NameAr,
                
                e.TeacherId,
                TeacherName = e.Teachers.Name,
                //TeacherNameAr = e.Teachers.NameAr,

                TimeTableCode = e.TimeTables.Code,
                TimeTableName = e.TimeTables.Name,
                TimeTablePeriodDurationMIns = e.TimeTables.PeriodDurationMIns,

                e.TimeTables.ShiftID,
                ShiftName = e.TimeTables.Shifts.Name,
                ShiftNameAr = e.TimeTables.Shifts.NameAr,
                ShiftStartTime = e.TimeTables.Shifts.StartTime,
                ShiftEndTime = e.TimeTables.Shifts.EndTime,
                ShiftBreakStartTime = e.TimeTables.Shifts.BreakStartTime,
                ShiftBreakEndTime = e.TimeTables.Shifts.BreakEndTime,

                e.TimeTables.ClassID,
                ClassName = e.TimeTables.Classes.Name,
                ClassNameAr = e.TimeTables.Classes.NameAr,

                e.TimeTables.SectionID,
                SectionName = e.TimeTables.Sections.Name,
                SectionNameAr = e.TimeTables.Sections.NameAr,

            }).ToList();
            return this.Request.CreateResponse(HttpStatusCode.OK, query);
        }

        // POST api/<controller>
        public HttpResponseMessage Post(TimeTables timeTable)
        {
            try
            {
                entities.TimeTableDetails.Add(new TimeTableDetails()
                {
                    //Code = new AutoCodeGeneration().GenerateCode("TimeTableDetails", "Code"),  //timeTable.Code,
                    TimeTableID = timeTable.TimeTableID,
                    //ShiftID = timeTable.ShiftID,
                    //ClassID = timeTable.ClassID,
                    //SectionID = timeTable.SectionID,
                    //PeriodDurationMIns = timeTable.PeriodDurationMIns
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
        
        [HttpGet]
        [Route("api/CreateEmptyTimeTableDetails/{timeTableId}/{dayId}")]
        public HttpResponseMessage CreateEmptyTimeTableDetails(int TimeTableID, int DayID)
        {
            try
            {
                TimeSpan TimeIn, TimeOut;
                bool IsBreak;
                string strLog = "";

                TimeTables TimeTable = entities.TimeTables.Include("Shifts").FirstOrDefault(t => t.TimeTableID == TimeTableID);
                if (TimeTable!=null && TimeTable.TimeTableID > 0) 
                {
                    TimeSpan ShiftDifference = TimeTable.Shifts.EndTime - TimeTable.Shifts.StartTime;

                    //return Request.CreateResponse(HttpStatusCode.OK, ShiftDifference.TotalMinutes/TimeTable.PeriodDurationMIns);
                    for (int index = 0; index < ShiftDifference.TotalMinutes; )
                    {
                        if (index == 0)
                        {
                            TimeIn = TimeTable.Shifts.StartTime.Add(new TimeSpan(0, index, 0));
                            index = index + TimeTable.PeriodDurationMIns;
                            TimeOut = TimeTable.Shifts.StartTime.Add(new TimeSpan(0, index, 0));
                        }
                        else
                        {
                            TimeIn = TimeTable.Shifts.StartTime.Add(new TimeSpan(0, index + 1, 0));
                            index = index + TimeTable.PeriodDurationMIns;
                            TimeOut = TimeTable.Shifts.StartTime.Add(new TimeSpan(0, index, 0));
                        }

                        strLog = strLog  + string.Format(" [ {0}  *  {1} = {2} ] ",Math.Abs( (TimeIn - TimeTable.Shifts.BreakStartTime).TotalMinutes), 
                            Math.Abs((TimeTable.Shifts.BreakEndTime - TimeOut).TotalMinutes),
                             (Math.Abs((TimeIn - TimeTable.Shifts.BreakStartTime).TotalMinutes) + Math.Abs((TimeTable.Shifts.BreakEndTime - TimeOut).TotalMinutes)));

                        IsBreak = (Math.Abs( (TimeIn - TimeTable.Shifts.BreakStartTime).TotalMinutes) + Math.Abs( (TimeTable.Shifts.BreakEndTime - TimeOut).TotalMinutes)) <= 5 ? true : false;

                        entities.TimeTableDetails.Add(new TimeTableDetails()
                        {
                            TimeTableID = TimeTableID,
                            DayID = DayID,
                            StartTime = TimeIn,
                            EndTime = TimeOut,
                            IsBreak = IsBreak
                            //ShiftID = timeTable.ShiftID,
                            //ClassID = timeTable.ClassID,
                            //SectionID = timeTable.SectionID,
                            //PeriodDurationMIns = timeTable.PeriodDurationMIns
                        });
                    }
                    entities.SaveChanges();
                }
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
        //[HttpPost]
        //[Route("api/UpdateTimeTableDetails/{timeTableId}/{dayId}/{TimeTableDetails}")]
        public HttpResponseMessage Put(List<TimeTableDetails> timeTableDetails)
        {
            string strLog = "";
            try
            {
                int TimeTableID = timeTableDetails.FirstOrDefault().TimeTableID;
                int DayID = timeTableDetails.FirstOrDefault().DayID;
                //List<TimeTableDetails> timeTableDetails = timeTable.TimeTableDetails.ToList();
                //List<TimeTableDetails> timeTableDetails = timeTable.TimeTableDetails.ToList();
                //var entity = entities.TimeTableDetails.Find(timeTableDetail.TimeTableID);
                //if (entity != null)
                //{
                //    entities.Entry(entity).CurrentValues.SetValues(timeTableDetail);
                //    entities.SaveChanges();
                //}

                //strLog += " -- " + string.Format("TimetableID={0} & DayID={1}", TimeTableID, DayID);

                List<TimeTableDetails> entityTimeTableDetails = entities.TimeTableDetails.Where(t => t.TimeTableID == TimeTableID && t.DayID == DayID).ToList();

                foreach (TimeTableDetails item in entityTimeTableDetails)
                {
                    //strLog += " --- " + string.Format("item.TimeTableDetailID={0}", item.TimeTableDetailID);
                    var tt = timeTableDetails.FirstOrDefault(t => t.TimeTableDetailID == item.TimeTableDetailID);
                    if (!(tt != null && tt.TimeTableDetailID > 0))
                    {
                        //strLog += " ---- " + string.Format(" inside delete tt.TimeTableDetailID={0}", item.TimeTableDetailID);
                        entities.Entry(item).State = EntityState.Deleted;
                        entities.TimeTableDetails.Remove(item);
                    }
                }

                if (timeTableDetails.Count > 0)
                {
                    //strLog += " ----- " + string.Format(" inside if timeTableDetails.Count ={0}", timeTableDetails.Count );
                    foreach (var timeTableDetail in timeTableDetails)
                    {
                        if (timeTableDetail.TimeTableDetailID > 0) // Edit
                        {
                             
                            var entity = entities.TimeTableDetails.Find(timeTableDetail.TimeTableDetailID);
                            if (entity != null)
                            {
                                //strLog += " ------ " + string.Format(" inside update timeTableDetail.TimeTableDetailID={0}", timeTableDetail.TimeTableDetailID);
                                entities.Entry(entity).CurrentValues.SetValues(timeTableDetail);
                                //entities.SaveChanges();
                            }
                        }
                        else if(timeTableDetail.TimeTableDetailID == 0) // Add
                        {
                            entities.TimeTableDetails.Add(new TimeTableDetails()
                            {
                                TimeTableID = TimeTableID,
                                DayID = DayID,
                                StartTime = timeTableDetail.StartTime,
                                EndTime = timeTableDetail.EndTime,
                                IsBreak = timeTableDetail.IsBreak,
                                LocationID = timeTableDetail.LocationID,
                                SubjectID = timeTableDetail.SubjectID,
                                TeacherId = timeTableDetail.TeacherId,
                                //ShiftID = timeTable.ShiftID,
                                //ClassID = timeTable.ClassID,
                                //SectionID = timeTable.SectionID,
                                //PeriodDurationMIns = timeTable.PeriodDurationMIns
                            });
                        }
                    }

                    entities.SaveChanges();
                }

                return Request.CreateResponse(HttpStatusCode.OK, "OK hogya ... " + strLog);
                //var result = entities.TimeTableDetails.SingleOrDefault(t => t.TimeTableID == timeTable.TimeTableID);
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

                //    entities.TimeTableDetails.Attach(result);
                //    entities.Entry(result).State = System.Data.Entity.EntityState.Modified;
                //    entities.SaveChanges();
                //}
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, "I have some issue ... "+ strLog + " --> " + ex.Message);
            }
        }

        /*
        // DELETE api/<controller>/5
        public void Delete(int id)
        {
            try
            {
                var timeTable = new TimeTableDetails { TimeTableID = id };
                if (timeTable != null)
                {
                    entities.Entry(timeTable).State = EntityState.Deleted;
                    entities.TimeTableDetails.Remove(timeTable);
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
        [Route("api/RemoveTimeTableDetail/{id}")]
        public HttpResponseMessage RemoveTimeTableDetail(int id)
        {
            try
            {
                var timeTable = new TimeTableDetails { TimeTableDetailID = id };
                if (timeTable != null)
                {
                    entities.Entry(timeTable).State = EntityState.Deleted;
                    entities.TimeTableDetails.Remove(timeTable);
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