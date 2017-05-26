using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using SMSServices.Models;

namespace SMSServices.Controllers
{
    public class Nationalities2Controller2 : ApiController
    {
        private SMSEntities db = new SMSEntities();

        // GET: api/Nationalities
        public IQueryable<Nationalities> GetNationalities()
        {
            return db.Nationalities;
        }

        // GET: api/Nationalities/5
        [ResponseType(typeof(Nationalities))]
        public IHttpActionResult GetNationalities(int id)
        {
            Nationalities nationalities = db.Nationalities.Find(id);
            if (nationalities == null)
            {
                return NotFound();
            }

            return Ok(nationalities);
        }

        // PUT: api/Nationalities/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutNationalities(int id, Nationalities nationalities)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != nationalities.NationalityId)
            {
                return BadRequest();
            }

            db.Entry(nationalities).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NationalitiesExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Nationalities
        [ResponseType(typeof(Nationalities))]
        public IHttpActionResult PostNationalities(Nationalities nationalities)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Nationalities.Add(nationalities);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (NationalitiesExists(nationalities.NationalityId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = nationalities.NationalityId }, nationalities);
        }

        // DELETE: api/Nationalities/5
        [ResponseType(typeof(Nationalities))]
        public IHttpActionResult DeleteNationalities(int id)
        {
            Nationalities nationalities = db.Nationalities.Find(id);
            if (nationalities == null)
            {
                return NotFound();
            }

            db.Nationalities.Remove(nationalities);
            db.SaveChanges();

            return Ok(nationalities);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool NationalitiesExists(int id)
        {
            return db.Nationalities.Count(e => e.NationalityId == id) > 0;
        }
    }
}