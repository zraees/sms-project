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
    public class StudentsEmergencyContactDetailsController : ApiController
    {
        private SMSEntities entities = new SMSEntities();

        // GET api/<controller>
        [Route("api/StudentsEmergencyContactDetails/All/{studentId}")]
        //public IEnumerable<StudentsEmergencyContactDetails> Get()
        public HttpResponseMessage Get(int studentId)
        {
            entities.Configuration.ProxyCreationEnabled = false;

            var query = entities.StudentsEmergencyContactDetails//.Include("Classes").Include("Shifts");
                //query.Include("Sections")
            .Where(t => t.StudentId == studentId)
            .Select(e => new
            {
                e.StudentEmergencyContactDetailId,
                e.StudentId,
                StudentName = e.Students.Name1,
                e.ContactPersonName,
                e.ContactPersonRelation,
                e.Email,
                e.WorkPhoneNo,
                e.HomePhoneNo,
                e.MobileNo,
                e.OtherDetails
            });

            //return query.ToList(); //entities.StudentsEmergencyContactDetails.Include("Classes").Include("Shifts").Include("Sections");
            return this.Request.CreateResponse(HttpStatusCode.OK, query.ToList());
        }

        // POST api/<controller>
        public void Post(StudentsEmergencyContactDetails studentEmergencyContactDetails)
        {
            try
            {
                entities.StudentsEmergencyContactDetails.Add(new StudentsEmergencyContactDetails()
                {
                    ContactPersonName = studentEmergencyContactDetails.ContactPersonName,
                    ContactPersonRelation = studentEmergencyContactDetails.ContactPersonRelation,
                    Email = studentEmergencyContactDetails.Email,
                    HomePhoneNo = studentEmergencyContactDetails.HomePhoneNo,
                    MobileNo = studentEmergencyContactDetails.MobileNo,
                    StudentId = studentEmergencyContactDetails.StudentId,
                    OtherDetails = studentEmergencyContactDetails.OtherDetails,
                    WorkPhoneNo = studentEmergencyContactDetails.WorkPhoneNo 
                });
                entities.SaveChanges();
            }
            catch (DbUpdateException)
            {
                throw;
            }
        }

        // PUT api/<controller>/5
        public void Put(StudentsEmergencyContactDetails studentEmergencyContactDetails)
        {

        }

        /*
        // DELETE api/<controller>/5
        [Route("api/StudentsEmergencyContactDetails/{id}")]
        public void Delete(int id)
        {
            try
            {
                var studentEmergencyContactDetails = new StudentsEmergencyContactDetails { StudentEmergencyContactDetailId = id };
                if (studentEmergencyContactDetails != null)
                {
                    entities.Entry(studentEmergencyContactDetails).State = EntityState.Deleted;
                    entities.StudentsEmergencyContactDetails.Remove(studentEmergencyContactDetails);
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
        [Route("api/RemoveStudentEmergencyContactDetail/{id}")]
        public HttpResponseMessage RemoveTeacherExperience(int id)
        {
            try
            {
                var studentEmergencyContactDetails = new StudentsEmergencyContactDetails { StudentEmergencyContactDetailId = id };
                if (studentEmergencyContactDetails != null)
                {
                    entities.Entry(studentEmergencyContactDetails).State = EntityState.Deleted;
                    entities.StudentsEmergencyContactDetails.Remove(studentEmergencyContactDetails);
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