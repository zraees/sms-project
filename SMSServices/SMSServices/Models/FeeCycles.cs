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
    
    public partial class FeeCycles
    {
        public FeeCycles()
        {
            this.FeeDueOnFrequencies = new HashSet<FeeDueOnFrequencies>();
            this.FeeTypes = new HashSet<FeeTypes>();
        }
    
        public int ID { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string NameAr { get; set; }
    
        public virtual ICollection<FeeDueOnFrequencies> FeeDueOnFrequencies { get; set; }
        public virtual ICollection<FeeTypes> FeeTypes { get; set; }
    }
}