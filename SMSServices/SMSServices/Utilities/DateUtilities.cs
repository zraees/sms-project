using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SMSServices.Utilities
{
    public class DateUtilities
    {
        public void DateDiff(DateTime dt1, DateTime dt2, ref int years, ref int months, ref int days)
        {
            DateTime zeroTime = new DateTime(1, 1, 1);
            TimeSpan span = dt2 - dt1;

            // because we start at year 1 for the Gregorian 
            // calendar, we must subtract a year here.

            years = (zeroTime + span).Year - 1;
            months = (zeroTime + span).Month - 1;
            days = (zeroTime + span).Day;
            
            //return string.Format("{0} - {1} - {2}", years, months, days);
        }
    }
}