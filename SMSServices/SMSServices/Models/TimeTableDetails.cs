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
    
    public partial class TimeTableDetails
    {
        public int TimeTableDetailID { get; set; }
        public int TimeTableID { get; set; }
        public Nullable<int> LocationID { get; set; }
        public Nullable<int> TeacherId { get; set; }
        public Nullable<int> SubjectID { get; set; }
        public int DayID { get; set; }
        public System.TimeSpan StartTime { get; set; }
        public System.TimeSpan EndTime { get; set; }
        public bool IsBreak { get; set; }
    
        public virtual Days Days { get; set; }
        public virtual Locations Locations { get; set; }
        public virtual Subjects Subjects { get; set; }
        public virtual Teachers Teachers { get; set; }
        public virtual TimeTables TimeTables { get; set; }
    }
}
