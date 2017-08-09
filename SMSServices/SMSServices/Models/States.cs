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
    
    public partial class States
    {
        public States()
        {
            this.Cities = new HashSet<Cities>();
            this.TeacherExperiences = new HashSet<TeacherExperiences>();
            this.Students = new HashSet<Students>();
        }
    
        public int ID { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string NameAr { get; set; }
        public int CountryId { get; set; }
        public Nullable<bool> IsActive { get; set; }
    
        public virtual ICollection<Cities> Cities { get; set; }
        public virtual Countries Countries { get; set; }
        public virtual ICollection<TeacherExperiences> TeacherExperiences { get; set; }
        public virtual ICollection<Students> Students { get; set; }
    }
}
