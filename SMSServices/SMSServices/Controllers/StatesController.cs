﻿using SMSServices.Helper;
using SMSServices.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SMSServices.Controllers
{
    public class StatesController : ApiController
    {
        private SMSEntities entities = new SMSEntities();

        // GET api/<controller>
        public IEnumerable<States> Get()
        {
            entities.Configuration.ProxyCreationEnabled = false;
            return entities.States;
        }

        // GET api/<controller>/5
        [Route("api/States/{countryId}")]
        public IEnumerable<KeyValue> Get(int countryId)
        {
            return entities.States
                    .Where(c => c.CountryId == countryId
                            && c.IsActive.Value == true)
                    .Select(a => new KeyValue() { Id = a.ID , Name = a.Name });
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