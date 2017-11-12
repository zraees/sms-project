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
    
    public partial class TeacherExperiences
    {
        public int TeacherExperienceId { get; set; }
        public int TeacherId { get; set; }
        public Nullable<System.DateTime> StartDate { get; set; }
        public Nullable<System.DateTime> EndDate { get; set; }
        public string TotalExperience { get; set; }
        public string Designation { get; set; }
        public Nullable<int> CountryId { get; set; }
        public Nullable<int> StateId { get; set; }
        public Nullable<int> CityId { get; set; }
        public string LeavingReason { get; set; }
        public string CompanyName { get; set; }
    
        public virtual Cities Cities { get; set; }
        public virtual States States { get; set; }
        public virtual Countries Countries { get; set; }
        public virtual Teachers Teachers { get; set; }
    }
}
