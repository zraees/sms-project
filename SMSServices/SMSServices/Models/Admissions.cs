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
    
    public partial class Admissions
    {
        public int AdmissionID { get; set; }
        public int StudentID { get; set; }
        public Nullable<System.DateTime> Date { get; set; }
    
        public virtual Students Students { get; set; }
    }
}
