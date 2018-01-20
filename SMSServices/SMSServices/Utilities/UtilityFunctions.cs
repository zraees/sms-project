using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SMSServices.Utilities
{
    public class UtilityFunctions
    {
        public List<int> StringToIntegerList(string IDs)
        {
            return IDs.Split(',').Select(int.Parse).ToList();
        }
    }
}