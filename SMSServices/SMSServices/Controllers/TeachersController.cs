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
    public class TeachersController : ApiController
    {
        private SMSEntities entities = new SMSEntities();

        // GET api/<controller>
        public IEnumerable<Teachers> Get()
        {
            entities.Configuration.ProxyCreationEnabled = false;
            return entities.Teachers;
        }

        // GET api/<controller>/5
        public Teachers Get(int id)
        {
            entities.Configuration.ProxyCreationEnabled = false;
            //Teachers teacher = entities.Teachers.Where(t => t.TeacherId == id).FirstOrDefault();
            //if (teacher != null) { teacher.DOB = teacher.DOB.HasValue ? DateTime.Now.Date : (DateTime?)null; }
            return entities.Teachers.Where(t => t.TeacherId == id).FirstOrDefault();
        }

        // GET api/<controller>/5/email@domain.com
        [Route("api/Teachers/{id}/{email}")]
        public Teachers Get(int id, string email)
        {
            entities.Configuration.ProxyCreationEnabled = false;
            Teachers teacher;
            //teacher = entities.Teachers.Where(t => t.TeacherId == id && t.Email == email).FirstOrDefault();
            //if (teacher == null)
                teacher = new Teachers() { Email = string.Empty };
            return teacher;
        }

        // POST api/<controller>
        public void Post(Teachers teacher)
        {         
            try
            {
                entities.Teachers.Add(new Teachers()
                {
                    Name = teacher.Name,
                    Email = teacher.Email,
                    DOB = teacher.DOB,
                    Gender = teacher.Gender,
                    IDNo = teacher.IDNo,
                    NationalityId = teacher.NationalityId,
                    Rating = teacher.Rating,
                    Address = teacher.Address,
                    PhoneNo = teacher.PhoneNo,
                    MobileNo = teacher.MobileNo,
                    CountryId = teacher.CountryId,
                    StateId = teacher.StateId,
                    CityId = teacher.CityId
                });
                entities.SaveChanges();
            }
            catch (DbUpdateException)
            {
                throw;
            }
        }

        // PUT api/<controller>/5
        public void Put(Teachers teacher)
        {
            try
            {
                var entity = entities.Teachers.Find(teacher.TeacherId);
                if (entity != null)
                {
                    entities.Entry(entity).CurrentValues.SetValues(teacher);
                    entities.SaveChanges();
                }
                //var result = entities.Teachers.SingleOrDefault(t => t.TeacherId == teacher.TeacherId);
                //if (result != null)
                //{
                //    //int a = Convert.ToInt32("aaa");
                //    result.Name = teacher.Name;
                //    result.Email = teacher.Email;
                //    result.DOB = teacher.DOB;
                //    result.Gender = teacher.Gender;
                //    result.IDNo = teacher.IDNo;
                //    result.NationalityId = teacher.NationalityId;
                //    result.Rating = teacher.Rating;

                //    entities.Teachers.Attach(result);
                //    entities.Entry(result).State = System.Data.Entity.EntityState.Modified;
                //    entities.SaveChanges();
                //}
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
                var teacher = new Teachers { TeacherId = id };
                if (teacher != null)
                {
                    entities.Entry(teacher).State = EntityState.Deleted;
                    entities.Teachers.Remove(teacher);
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
        [Route("api/RemoveTeacher/{id}")]
        public HttpResponseMessage RemoveTeacher(int id)
        {
            try
            {
                var teacher = new Teachers { TeacherId = id };
                if (teacher != null)
                {
                    entities.Entry(teacher).State = EntityState.Deleted;
                    entities.Teachers.Remove(teacher);
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