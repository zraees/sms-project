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
    
    public partial class Sections
    {
        public Sections()
        {
            this.ClassesSections = new HashSet<ClassesSections>();
            this.StudentsClasses = new HashSet<StudentsClasses>();
            this.TimeTables = new HashSet<TimeTables>();
        }
    
        public int ID { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string NameAr { get; set; }
    
        public virtual ICollection<ClassesSections> ClassesSections { get; set; }
        public virtual ICollection<StudentsClasses> StudentsClasses { get; set; }
        public virtual ICollection<TimeTables> TimeTables { get; set; }
    }
}
