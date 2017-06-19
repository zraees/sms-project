using SMSServices.Models;
using System;
using System.Data.Entity;
using System.Diagnostics;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

public class ExecutionTimeFilter : ActionFilterAttribute
{
    public override void OnActionExecuting(HttpActionContext actionContext)
    {
        //Method executing
        base.OnActionExecuting(actionContext);
        //Adding new key stopwatch which will be added to the current request properties
        actionContext.Request.Properties.Add("Time", Stopwatch.StartNew());

    }

    public override void OnActionExecuted(HttpActionExecutedContext actionContext)
    {
        //Executed
        base.OnActionExecuted(actionContext);
        try
        {

            //retriving the stopwatch which we added in Executing method
            var stopwatch = (Stopwatch)actionContext.Request.Properties["Time"];
            //removing the key
            actionContext.Request.Properties.Remove("Time");

            //get the time Elapese means time take to execute the request
            var elapsedTime = stopwatch.Elapsed;
            if (!(elapsedTime.TotalSeconds > 10)) return;   
            //Ignoring controllers took seconds <10 so not inserting them into database
            using (SMSEntities dbContext = new SMSEntities())
            {
                Errors error = new Errors
                {
                    TotalSeconds = (decimal)elapsedTime.TotalSeconds,
                    Active = true,
                    CommandType = "Action Context",
                    CreateDate = DateTime.Now,
                    Exception = Convert.ToString(actionContext.Request),
                    FileName = "",
                    InnerException = actionContext.Response.ToString(),
                    Parameters = "",
                    Query = "",
                    RequestId = 0
                };
                dbContext.Errors.Add(error);
                dbContext.SaveChanges();
            }
        }
        catch
        {
            // ignored
        }
    }
}