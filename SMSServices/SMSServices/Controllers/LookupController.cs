using SMSServices.Helper;
using SMSServices.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SMSServices.Controllers
{
    public class LookupController : ApiController
    {
        private SMSEntities entities = new SMSEntities();

        // GET api/<controller>
        [Route("api/Lookup/{TblName}")]
        public IEnumerable<KeyValue> Get(string TblName)
        {
            entities.Configuration.ProxyCreationEnabled = false;

            return entities.Database.SqlQuery<KeyValue>(string.Format("SELECT Id, Code, Name FROM {0}", TblName)).ToList();
            //return entities.Countries.Where(c => !string.IsNullOrEmpty(c.Nationality)).Select(a => new KeyValue() { Id = a.CountryId, Name = a.Name });
        }

        // GET api/<controller>/5
        [Route("api/Lookup/{TblName}/{id}")]
        public KeyValue Get(string TblName, int id)
        {
            //return entities.Countries.Where(n => n.CountryId == id)
            return entities.Database.
                SqlQuery<KeyValue>(string.Format("SELECT Id, Code, Name FROM {0}", TblName))
                .Where(n => n.Id == id)
                .FirstOrDefault();
        }

        [Route("api/Lookup/{TblName}/{ForeignKeyName}/{ForeignKeyId}")]
        public HttpResponseMessage Get(string TblName, string ForeignKeyName, int ForeignKeyId)
        {
            var query = entities.Database.
                SqlQuery<KeyValue>(string.Format("SELECT Id, Code, Name FROM {0} WHERE {1} = {2}",
                                                    TblName, ForeignKeyName, ForeignKeyId));

            return this.Request.CreateResponse(HttpStatusCode.OK, query.ToList());
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