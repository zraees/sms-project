using SMSServices.Models;
using System;
using System.Collections.Concurrent;
//this file is used to log the database operations it checks
//the query execution time and than insert if it takes more than one second.
//to disable it remove its registry from TeamPassDbContext default constructor
using System.Data.Common;
using System.Data.Entity;
using System.Data.Entity.Infrastructure.Interception;
using System.Text;
public class DatabaseLogger : IDbCommandInterceptor
{
    static readonly ConcurrentDictionary<DbCommand,
    DateTime> MStartTime = new ConcurrentDictionary<DbCommand, DateTime>();

    public void NonQueryExecuted(DbCommand command,
    DbCommandInterceptionContext<int> interceptionContext)
    {
        //executed state
        Log(command, interceptionContext);
    }

    public void NonQueryExecuting(DbCommand command,
    DbCommandInterceptionContext<int> interceptionContext)
    {
        //executing state
        OnStart(command);
    }

    public void ReaderExecuted(DbCommand command,
    DbCommandInterceptionContext<DbDataReader> interceptionContext)
    {
        //reader executed state
        Log(command, interceptionContext);
    }

    public void ReaderExecuting(DbCommand command,
    DbCommandInterceptionContext<DbDataReader> interceptionContext)
    {
        //reader executing state
        OnStart(command);
    }

    private static void Log<T>(DbCommand command,
    DbCommandInterceptionContext<T> interceptionContext)
    {
        DateTime startTime;
        TimeSpan duration;
        //Removing from dictionary and calculating time
        MStartTime.TryRemove(command, out startTime);
        if (startTime != default(DateTime))
        {
            duration = DateTime.Now - startTime;
        }
        else
            duration = TimeSpan.Zero;

        const int requestId = -1;

        var parameters = new StringBuilder();
        foreach (DbParameter param in command.Parameters)
        {
            parameters.AppendLine(param.ParameterName + " " +
            param.DbType + " = " + param.Value);
        }
        /*
        var message = interceptionContext.Exception == null ?
            string.Format("Database call took {0} sec. RequestId {1} \r\nCommand:\r\n{2} + {3}", duration.TotalSeconds.ToString("N3"),requestId, parameters, command.CommandText)
            :
            string.Format( "EF Database call failed after {0} sec. RequestId {1} \r\nCommand:\r\n{2} + {3}\r\nError:{4} ",
            duration.TotalSeconds.ToString("N3"), requestId, parameters.ToString(), command.CommandText, interceptionContext.Exception);
        */
        //Ignoring some queries which runs perfectly
        if(true) //if (duration.TotalSeconds > 1 || message.Contains("EF Database call failed after "))
        {
            //The time taken is more or it contains error so adding that to database
            using (SMSEntities dbContext = new SMSEntities())
            {
                //using error model class
                Errors error = new Errors
                {
                    TotalSeconds = (decimal)duration.TotalSeconds,
                    Active = true,
                    CommandType = Convert.ToString(command.CommandType),
                    CreateDate = DateTime.Now,
                    Exception = Convert.ToString(interceptionContext.Exception),
                    FileName = "",
                    InnerException = interceptionContext.Exception == null ?
                    "" : Convert.ToString(interceptionContext.Exception.InnerException),
                    Parameters = parameters.ToString(),
                    Query = command.CommandText,
                    RequestId = 0
                };
                //Adding to database
                dbContext.Errors.Add(error);
                dbContext.SaveChanges();
            }

            //var errorFileUrl = ;
            //File.WriteAllLines(, message);
        }
    }

    public void ScalarExecuted
    (DbCommand command, DbCommandInterceptionContext<object> interceptionContext)
    {
        //Log and calculate after executed
        Log(command, interceptionContext);
    }

    public void ScalarExecuting
    (DbCommand command, DbCommandInterceptionContext<object> interceptionContext)
    {
        //adding to dictionary when executing
        OnStart(command);
    }
    private static void OnStart(DbCommand command)
    {
        //adding to dictionary when executing
        MStartTime.TryAdd(command, DateTime.Now);
    }
}


/*
           //TODO remove this when don't need to log anything
           DbInterception.Add(new DatabaseLogger());

*/