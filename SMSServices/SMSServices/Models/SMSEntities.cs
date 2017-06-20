using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.Validation;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;
using WebApi.ErrorHelper;

namespace SMSServices.Models
{
    public partial class SMSEntities
    {
        public override int SaveChanges()
        {
            try
            {
                return base.SaveChanges();
            }
            catch (DbUpdateException dbEx)
            {
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
                int ErrorCode = GetErrorCode(dbEx);
                throw new ApiDataException(ErrorCode, GetCustomMessage(ErrorCode, dbEx) , HttpStatusCode.BadRequest);
            
                //Logger.ErrorFormat("Validation errors: {0}", sb.ToString());
            }
            //catch (DbEntityValidationException ex)
            //{
            //    // Retrieve the error messages as a list of strings.
            //    var errorMessages = ex.EntityValidationErrors
            //            .SelectMany(x => x.ValidationErrors)
            //            .Select(x => x.ErrorMessage);

            //    // Join the list to a single string.
            //    //var fullErrorMessage = string.Join(&quot;; &quot;, errorMessages);

            //    // Combine the original exception message with the new one.
            //    //var exceptionMessage = string.Concat(ex.Message, &quot; The validation errors are: &quot;, fullErrorMessage);

            //    // Throw a new DbEntityValidationException with the improved exception message.
            //    throw new DbEntityValidationException(exceptionMessage, ex.EntityValidationErrors);
            //}
        }

        private string GetCustomMessage(int ErrorCode, DbUpdateException dbEx)
        {
            switch (ErrorCode)
            {
                case 2601:
                    return "ViolationOfUniquenessErrorText";
                default:
                    return "";
            }
        }

        private int GetErrorCode(DbUpdateException dbEx)
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
    }
}