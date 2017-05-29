﻿using SMSServices.Models;
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
            return entities.TeacherQualifications;
        }

        // GET api/<controller>/5
        public TeacherQualifications Get(int id)
        {
            entities.Configuration.ProxyCreationEnabled = false;
            return entities.TeacherQualifications.Where(t => t.QualificationTypeId == id).FirstOrDefault();
        } 

        // POST api/<controller>
        public void Post(TeacherQualifications teacherQualification)
        {         
            try
            {
                entities.TeacherQualifications.Add(new TeacherQualifications()
                {
                    Qualification = teacherQualification.Qualification,
                    Majors = teacherQualification.Majors,
                    StartDate = teacherQualification.StartDate,
                    EndDate = teacherQualification.EndDate,
                    Duration = teacherQualification.Duration,
                    QualificationTypeId = teacherQualification.QualificationTypeId,
                    ScoreType = teacherQualification.ScoreType,
                    Score = teacherQualification .Score,
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
    }
}