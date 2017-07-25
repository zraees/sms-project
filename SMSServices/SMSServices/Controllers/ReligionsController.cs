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
    public class ReligionsController : ApiController
    {
        private SMSEntities entities = new SMSEntities();

        // GET api/<controller>
        public IEnumerable<KeyValue> Get()
        {
            //int[] country = { 101, 166 };c => country.Contains(c.ReligionId)
            entities.Configuration.ProxyCreationEnabled = false;
            return entities.Religions.Select(a => new KeyValue() { Id = a.ReligionId, Name = a.Name });
        }

        // GET api/<controller>/5
        public Religions Get(int id)
        {
            return entities.Religions.Where(n => n.ReligionId == id).FirstOrDefault();
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