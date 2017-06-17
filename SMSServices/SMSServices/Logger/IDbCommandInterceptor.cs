﻿using System.Data.Common;
namespace System.Data.Entity.Infrastructure.Interception
{
    /// <summary>
    /// An object that implements this interface can be registered with 
    /// <see cref="T:System.Data.Entity.Infrastructure.Interception.DbInterception"/> to
    ///             receive notifications when Entity Framework executes commands.
    /// 
    /// </summary>
    /// 
    /// <remarks>
    /// Interceptors can also be registered in the config file of the application.
    ///             See http://go.microsoft.com/fwlink/?LinkId=260883 
    ///             for more information about Entity Framework configuration.
    /// 
    /// </remarks>
    public interface IDbCommandInterceptor : IDbInterceptor
    {
        /// <summary>
        /// This method is called before a call to 
        /// <see cref="M:System.Data.Common.DbCommand.ExecuteNonQuery"/> or
        ///             one of its async counterparts is made.
        /// 
        /// </summary>
        /// <param name="command">The command being executed.</param>
        /// <param name="interceptionContext">
        /// Contextual information associated with the call.</param>
        void NonQueryExecuting(DbCommand command, DbCommandInterceptionContext<int> interceptionContext);

        /// <summary>
        /// This method is called after a call to 
        /// <see cref="M:System.Data.Common.DbCommand.ExecuteNonQuery"/>  or
        /// one of its async counterparts is made. 
        /// The result used by Entity Framework can be changed by setting
        /// <see cref=

        /// "P:System.Data.Entity.Infrastructure.Interception.DbCommandInterceptionContext`1.Result"/>.
        /// 
        /// </summary>
        /// 
        /// <remarks>
        /// For async operations this method is not called until after the async task has completed
        ///             or failed.
        /// 
        /// </remarks>
        /// <param name="command">The command being executed.</param>
        /// <param name=

        /// "interceptionContext">Contextual information associated with the call.</param>
        void NonQueryExecuted(DbCommand command, DbCommandInterceptionContext<int> interceptionContext);

        /// <summary>
        /// This method is called before a call to 
        /// <see cref="M:System.Data.Common.DbCommand.ExecuteReader(System.Data.CommandBehavior)"/> or
        /// one of its async counterparts is made.
        /// 
        /// </summary>
        /// <param name="command">The command being executed.</param>
        /// <param name="interceptionContext">Contextual information associated with the call.
        /// </param>
        void ReaderExecuting(DbCommand command,
        DbCommandInterceptionContext<DbDataReader> interceptionContext);

        /// <summary>
        /// This method is called after a call to 
        /// <see cref="M:System.Data.Common.DbCommand.ExecuteReader(System.Data.CommandBehavior)"/> or
        /// one of its async counterparts is made. 
        /// The result used by Entity Framework can be changed by setting
        /// <see cref=

        /// "P:System.Data.Entity.Infrastructure.Interception.DbCommandInterceptionContext`1.Result"/>.
        /// 
        /// </summary>
        /// 
        /// <remarks>
        /// For async operations this method is not called until after the async task has completed
        ///             or failed.
        /// 
        /// </remarks>
        /// <param name="command">The command being executed.</param>
        /// <param name="interceptionContext">
        /// Contextual information associated with the call.</param>
        void ReaderExecuted(DbCommand command,
            DbCommandInterceptionContext<DbDataReader> interceptionContext);

        /// <summary>
        /// This method is called before a call to 
        /// <see cref="M:System.Data.Common.DbCommand.ExecuteScalar"/> or
        ///             one of its async counterparts is made.
        /// 
        /// </summary>
        /// <param name="command">The command being executed.</param>
        /// <param name="interceptionContext">
        /// Contextual information associated with the call.</param>
        void ScalarExecuting(DbCommand command, DbCommandInterceptionContext<object> interceptionContext);

        /// <summary>
        /// This method is called after a call to 
        /// <see cref="M:System.Data.Common.DbCommand.ExecuteScalar"/> or
        /// one of its async counterparts is made. 
        /// The result used by Entity Framework can be changed by setting
        /// <see cref=

        /// "P:System.Data.Entity.Infrastructure.Interception.DbCommandInterceptionContext`1.Result"/>.
        /// 
        /// </summary>
        /// 
        /// <remarks>
        /// For async operations this method is not called until after the async task has completed
        ///             or failed.
        /// 
        /// </remarks>
        /// <param name="command">The command being executed.
        /// </param><param name="interceptionContext">
        /// Contextual information associated with the call.</param>
        void ScalarExecuted(DbCommand command, DbCommandInterceptionContext<object> interceptionContext);
    }
}