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
    public class SampleDataController : ApiController
    {
        private SMSEntities entities = new SMSEntities();

        [HttpGet]
        [Route("api/SampleData/")]
        public int GenerateSampleData()
        {

            int result = 0;

            entities.spDeleteTables("master");

            result += new StudentsController().GenerateSampleData();
            result += new ClassesSectionsController().GenerateSampleData();
            result += new TeachersController().GenerateSampleData();

            return result;
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