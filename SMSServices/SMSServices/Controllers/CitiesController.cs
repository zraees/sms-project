using SMSServices.HelperClasses;
using SMSServices.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SMSServices.Controllers
{
    public class CitiesController : ApiController
    {
        private SMSEntities entities = new SMSEntities();

        // GET api/<controller>
        public IEnumerable<Cities> Get()
        {
            entities.Configuration.ProxyCreationEnabled = false;
            return entities.Cities;
        }

        // GET api/<controller>/5
        [Route("api/Cities/{stateId}")]
        public IEnumerable<KeyValue> Get(int stateId)
        {
            return entities.Cities.Where(n => n.StateId == stateId).Select(a => new KeyValue() { Id = a.StateId, Name = a.Name });
        }

        // POST api/<controller>
        public void Post([FromBody]string value)
        {
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
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