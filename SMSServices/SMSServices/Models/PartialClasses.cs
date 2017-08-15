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
    }
}