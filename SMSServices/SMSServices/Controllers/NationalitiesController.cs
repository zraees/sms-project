﻿using SMSServices.HelperClasses;
using SMSServices.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SMSServices.Controllers
{
    public class NationalitiesController : ApiController
    {
        private SMSEntities entities = new SMSEntities();

        // GET api/<controller>
        public IEnumerable<KeyValue> Get()
        {
            entities.Configuration.ProxyCreationEnabled = false;
            return entities.Countries.Where(c => !string.IsNullOrEmpty(c.Nationality)).Select(a => new KeyValue() { Id = a.CountryId, Name = a.Nationality });
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