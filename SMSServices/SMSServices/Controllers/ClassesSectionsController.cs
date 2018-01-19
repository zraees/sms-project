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
    public class ClassesSectionsController : ApiController
    {
        private SMSEntities entities = new SMSEntities();
        [HttpGet]
        [Route("api/ClassesSections/GenerateSampleData/")]
        public int GenerateSampleData()
        {  
            foreach (var shift in entities.Shifts.ToList())
            {
                foreach (var classe in entities.Classes.ToList())
                {
                    foreach (var section in entities.Sections.ToList())
                    {
                        entities.ClassesSections.Add(new ClassesSections()
                        {
                            ShiftID = shift.ID,
                            ClassID = classe.ID,
                            SectionID = section.ID
                        });
                        
                    }
                }
            }

            return entities.SaveChanges();
        }

        // GET api/<controller>
        [Route("api/ClassesSections/All")]
        //public IEnumerable<ClassesSections> Get()
        public HttpResponseMessage Get()
        {
            entities.Configuration.ProxyCreationEnabled = false;

            var query = entities.ClassesSections//.Include("Classes").Include("Shifts");
                //query.Include("Sections")
            .Select(e => new
            {
                e.ClassSectionID,
                e.ShiftID,
                ShiftName = e.Shifts.Name,
                ShiftNameAr = e.Shifts.NameAr,
                e.ClassID,
                ClassName = e.Classes.Name,
                ClassNameAr = e.Classes.NameAr,
                e.SectionID,
                SectionName = e.Sections.Name,
                SectionNameAr = e.Sections.NameAr
            });

            //return query.ToList(); //entities.ClassesSections.Include("Classes").Include("Shifts").Include("Sections");
            return this.Request.CreateResponse(HttpStatusCode.OK, query.ToList());
        }

        // GET api/<controller>/5/1/2
        [Route("api/ClassesSections/{ShiftId}/{ClassId}/{SectionId}")]
        public ClassesSections Get(int ShiftId, int ClassId, int SectionId)
        {
            entities.Configuration.ProxyCreationEnabled = false;
         
            ClassesSections ClassSection = entities.ClassesSections
                .Where(t => t.ShiftID == ShiftId && t.ClassID == ClassId && t.SectionID == SectionId).FirstOrDefault();

            if (ClassSection == null)
            {
                ClassSection = new ClassesSections() { ClassID = 0 };
            }

            return ClassSection;
        }

        // GET api/<controller>/5
        [Route("api/GetClassesByShiftId/{ShiftId}")]
        [HttpGet]
        public HttpResponseMessage GetClassesByShiftId(int ShiftId)
        {
            entities.Configuration.ProxyCreationEnabled = false;

            ClassesSections ClassSection = entities.ClassesSections
                .FirstOrDefault();

            var query = entities.ClassesSections
                .Where(t => t.ShiftID == ShiftId)
                .Select(e => new
                {   
                    Id = e.ClassID,
                    Name = e.Classes.Name,
                    NameAr = e.Classes.NameAr
                });
             
            return this.Request.CreateResponse(HttpStatusCode.OK, query.ToList().Distinct());
        }

        // GET api/<controller>/5
        [Route("api/GetClassesByShiftIdClassId/{ShiftId}/{ClassId}")]
        [HttpGet]
        public HttpResponseMessage GetClassesByShiftIdClassId(int ShiftId, int ClassId)
        {
            entities.Configuration.ProxyCreationEnabled = false;

            ClassesSections ClassSection = entities.ClassesSections
                .FirstOrDefault();

            var query = entities.ClassesSections
                .Where(t => t.ShiftID == ShiftId && t.ClassID == ClassId)
                .Select(e => new
                {
                    Id = e.SectionID,
                    Name = e.Sections.Name,
                    NameAr = e.Sections.NameAr
                });

            return this.Request.CreateResponse(HttpStatusCode.OK, query.ToList());
        }

        [Route("api/ClassesSectionsById/{id}")]
        public ClassesSections Get(int id)
        {
            entities.Configuration.ProxyCreationEnabled = false;
            //classSections classSection = entities.classSections.Where(t => t.classSectionId == id).FirstOrDefault();
            //if (classSection != null) { classSection.DOB = classSection.DOB.HasValue ? DateTime.Now.Date : (DateTime?)null; }
            return entities.ClassesSections.Where(t => t.ClassSectionID == id).FirstOrDefault();
        }

        //// GET api/<controller>/5/email@domain.com
        //[Route("api/ClassesSections/{id}/{email}")]
        //public ClassesSections Get(int id, string email)
        //{
        //    entities.Configuration.ProxyCreationEnabled = false;
        //    ClassesSections classSection;
        //    //classSection = entities.ClassesSections.Where(t => t.classSectionId == id && t.Email == email).FirstOrDefault();
        //    //if (classSection == null)
        //        classSection = new ClassesSections() { Email = string.Empty };
        //    return classSection;
        //}

        // POST api/<controller>
        public HttpResponseMessage Post(ClassesSections classSection)
        {
            try
            {
                entities.ClassesSections.Add(CreateClassSection(classSection));
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

        private ClassesSections CreateClassSection(ClassesSections classSection)
        {
            return new ClassesSections()
            {
                ShiftID = classSection.ShiftID,
                ClassID = classSection.ClassID,
                SectionID = classSection.SectionID
            };
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
        public void Put(ClassesSections ClassSection)
        {
            try
            {
                var entity = entities.ClassesSections.Find(ClassSection.ClassSectionID);
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
                var classSection = new ClassesSections { classSectionId = id };
                if (classSection != null)
                {
                    entities.Entry(classSection).State = EntityState.Deleted;
                    entities.ClassesSections.Remove(classSection);
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
        [Route("api/RemoveClassSection/{id}")]
        public HttpResponseMessage RemoveClassSection(int id)
        {
            try
            {
                var ClassSection = new ClassesSections { ClassSectionID = id };
                if (ClassSection != null)
                {
                    entities.Entry(ClassSection).State = EntityState.Deleted;
                    entities.ClassesSections.Remove(ClassSection);
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