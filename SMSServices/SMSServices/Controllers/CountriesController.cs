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
    public class CountriesController : ApiController
    {
        private SMSEntities entities = new SMSEntities();

        // GET api/<controller>
        public IEnumerable<KeyValue> Get()
        {
            //int[] country = { 101, 166 };c => country.Contains(c.CountryId)
            entities.Configuration.ProxyCreationEnabled = false;
            return entities.Countries.Where(c => !string.IsNullOrEmpty(c.Nationality)
                                        && c.IsActive.Value == true)
                                    .Select(a => new KeyValue() { Id = a.ID, Name = a.Name });
        }

        // GET api/<controller>/5
        public Countries Get(int id)
        {
            return entities.Countries.Where(n => n.ID == id).FirstOrDefault();
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