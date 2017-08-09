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
    
    public partial class Countries
    {
        public Countries()
        {
            this.States = new HashSet<States>();
            this.TeacherExperiences = new HashSet<TeacherExperiences>();
            this.Students = new HashSet<Students>();
            this.Students1 = new HashSet<Students>();
            this.Teachers = new HashSet<Teachers>();
        }
    
        public int ID { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string NameAr { get; set; }
        public string PhoneCode { get; set; }
        public string Nationality { get; set; }
        public Nullable<bool> IsActive { get; set; }
    
        public virtual ICollection<States> States { get; set; }
        public virtual ICollection<TeacherExperiences> TeacherExperiences { get; set; }
        public virtual ICollection<Students> Students { get; set; }
        public virtual ICollection<Students> Students1 { get; set; }
        public virtual ICollection<Teachers> Teachers { get; set; }
    }
}
