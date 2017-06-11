using SMSServices.Models;
using SMSServices.Utilities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SMSServices.Controllers
{
    public class TeacherQualificationsController : ApiController
    {
        private SMSEntities entities = new SMSEntities();

        // GET api/<controller>
        public IEnumerable<TeacherQualifications> Get()
        {
            entities.Configuration.ProxyCreationEnabled = false;
            return entities.TeacherQualifications.Include("QualificationTypes");
        }

        // GET api/<controller>/5
        [Route("api/TeacherQualifications/{teacherId}")]
        public IEnumerable<TeacherQualifications> Get(int teacherId)
        {
            entities.Configuration.ProxyCreationEnabled = false;
            return entities.TeacherQualifications.Where(t => t.TeacherId == teacherId);
        } 

        // POST api/<controller>
        public void Post(TeacherQualifications teacherQualification)
        {         
            try
            {
                entities.TeacherQualifications.Add(new TeacherQualifications()
                {
                    Qualification = teacherQualification.Qualification,
                    InstitutionName = teacherQualification.InstitutionName,
                    Majors = teacherQualification.Majors,
                    StartDate = teacherQualification.StartDate,
                    EndDate = teacherQualification.EndDate,
                    //Duration = teacherQualification.Duration,
                    Duration = CalculateQualificationDuration(teacherQualification),
                    QualificationTypeId = teacherQualification.QualificationTypeId,
                    ScoreType = teacherQualification.ScoreType,
                    Score = teacherQualification.Score,
                    TeacherId = teacherQualification.TeacherId
                });
                entities.SaveChanges();
            }
            catch (DbUpdateException)
            {
                throw;
            }
        }

        // PUT api/<controller>/5
        public void Put(TeacherQualifications teacherQualification)
        {
            
        }

        // DELETE api/<controller>/5
        [Route("api/TeacherQualifications/{id}")]
        public void Delete(int id)
        {
            try
            {
                var teacherQualification = new TeacherQualifications { TeacherQualificationId = id };
                if (teacherQualification != null)
                {
                    entities.Entry(teacherQualification).State = EntityState.Deleted;
                    entities.TeacherQualifications.Remove(teacherQualification);
                    entities.SaveChanges();
                }
            }
            catch (Exception)
            {

                throw;
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

        private string CalculateQualificationDuration(TeacherQualifications teacherQualification)
        {
            string result = string.Empty;
            int years, months, days;
            years = months = days = 0;

            DateUtilities dateUtilities = new DateUtilities();
            if (teacherQualification.StartDate.HasValue && teacherQualification.EndDate.HasValue)
                dateUtilities.DateDiff(teacherQualification.StartDate.Value, teacherQualification.EndDate.Value, ref years, ref months, ref days);

            return string.Format("{0} year{1} and {2} month{3}", years,
                years > 1 ? "s" : "",
                months + (days > 0 ? 1 : 0),
                (months + (days > 0 ? 1 : 0)) > 1 ? "s" : "").Replace("0 year and ", "").Replace("0 month", "");
        }

    }
}