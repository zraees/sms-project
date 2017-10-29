using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SMSServices.Models
{
    public partial class Students
    {
        public int ShiftId { get; set; }
        public int ClassId { get; set; }
        public int SectionId { get; set; }
        public int BatchId { get; set; }
        public string Name { get { return string.Format("{0} {1} {2} {3}", Name1, Name2, Name3, Name4); } }
        public string NameAr { get { return string.Format("{0} {1} {2} {3}", NameAr1, NameAr2, NameAr3, NameAr4); } }

    }
}