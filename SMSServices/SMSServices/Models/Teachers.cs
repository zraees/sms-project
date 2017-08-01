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
    
    public partial class Teachers
    {
        public Teachers()
        {
            this.TeacherExperiences = new HashSet<TeacherExperiences>();
            this.TeacherQualifications = new HashSet<TeacherQualifications>();
            this.TeachersClasses = new HashSet<TeachersClasses>();
            this.TeachersSubjects = new HashSet<TeachersSubjects>();
        }
    
        public int TeacherId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public Nullable<System.DateTime> DOB { get; set; }
        public string IDNo { get; set; }
        public string Gender { get; set; }
        public Nullable<int> Rating { get; set; }
        public string Address { get; set; }
        public string PhoneNo { get; set; }
        public string MobileNo { get; set; }
        public Nullable<int> CountryId { get; set; }
        public Nullable<int> StateId { get; set; }
        public Nullable<int> CityId { get; set; }
        public Nullable<int> NationalityId { get; set; }
    
        public virtual Countries Countries { get; set; }
        public virtual ICollection<TeacherExperiences> TeacherExperiences { get; set; }
        public virtual ICollection<TeacherQualifications> TeacherQualifications { get; set; }
        public virtual ICollection<TeachersClasses> TeachersClasses { get; set; }
        public virtual ICollection<TeachersSubjects> TeachersSubjects { get; set; }
    }
}
