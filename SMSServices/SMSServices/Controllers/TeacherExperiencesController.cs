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
    public class TeacherExperiencesController : ApiController
    {
        private SMSEntities entities = new SMSEntities();

        // GET api/<controller>
        public IEnumerable<TeacherExperiences> Get()
        {
            entities.Configuration.ProxyCreationEnabled = false;
            return entities.TeacherExperiences;
        }

        // GET api/<controller>/5
        [Route("api/TeacherExperiences/{teacherId}")]
        public IEnumerable<TeacherExperiences> Get(int teacherId)
        {
            entities.Configuration.ProxyCreationEnabled = false;
            return entities.TeacherExperiences.Where(t => t.TeacherId == teacherId);
        } 

        // POST api/<controller>
        public void Post(TeacherExperiences teacherExperiences)
        {         
            try
            {
                entities.TeacherExperiences.Add(new TeacherExperiences()
                {
                    CompanyName = teacherExperiences.CompanyName,
                    Designation = teacherExperiences.Designation,
                    LeavingReason = teacherExperiences.LeavingReason,
                    StartDate = teacherExperiences.StartDate,
                    EndDate = teacherExperiences.EndDate,
                    TotalExperience = CalculateTotalExperience(teacherExperiences),
                    TeacherId = teacherExperiences.TeacherId,
                    CountryId = teacherExperiences.CountryId,
                    StateId = teacherExperiences.StateId,
                    CityId = teacherExperiences.CityId
                });
                entities.SaveChanges();
            }
            catch (DbUpdateException)
            {
                throw;
            }
        }

        // PUT api/<controller>/5
        public void Put(TeacherExperiences teacherExperiences)
        {
            
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
            try
            {
                var teacherExperiences = new TeacherExperiences { TeacherExperienceId = id };
                if (teacherExperiences != null)
                {
                    entities.Entry(teacherExperiences).State = EntityState.Deleted;
                    entities.TeacherExperiences.Remove(teacherExperiences);
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
        
        private string CalculateTotalExperience(TeacherExperiences teacherExperiences)
        {
            string result = string.Empty;
            int years, months, days;
            years = months = days = 0;

            DateUtilities dateUtilities = new DateUtilities();
            if (teacherExperiences.StartDate.HasValue && teacherExperiences.EndDate.HasValue)
                dateUtilities.DateDiff(teacherExperiences.StartDate.Value, teacherExperiences.EndDate.Value, ref years, ref months, ref days);

            return string.Format("{0} year{1} and {2} month{3}", years,
                years > 1 ? "s" : "",
                months + (days > 0 ? 1 : 0),
                (months + (days > 0 ? 1 : 0)) > 1 ? "s" : "").Replace("0 year and ", "").Replace("0 month", "");
        }

    }
}