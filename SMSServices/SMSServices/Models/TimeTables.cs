//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace SMSServices.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class TimeTables
    {
        public TimeTables()
        {
            this.TimeTableDetails = new HashSet<TimeTableDetails>();
        }
    
        public int TimeTableID { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public int ShiftID { get; set; }
        public int ClassID { get; set; }
        public int SectionID { get; set; }
        public int PeriodDurationMIns { get; set; }
    
        public virtual Classes Classes { get; set; }
        public virtual Sections Sections { get; set; }
        public virtual Shifts Shifts { get; set; }
        public virtual ICollection<TimeTableDetails> TimeTableDetails { get; set; }
    }
}
