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
    
    public partial class Subjects
    {
        public Subjects()
        {
            this.TeachersSubjects = new HashSet<TeachersSubjects>();
            this.TimeTableDetails = new HashSet<TimeTableDetails>();
        }
    
        public int ID { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string NameAr { get; set; }
    
        public virtual ICollection<TeachersSubjects> TeachersSubjects { get; set; }
        public virtual ICollection<TimeTableDetails> TimeTableDetails { get; set; }
    }
}
