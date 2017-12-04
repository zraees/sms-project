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
    
    public partial class FeeTypes
    {
        public int FeeTypeID { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string NameAr { get; set; }
        public int FeeCycleID { get; set; }
        public int FeeDueOnFrequencyID { get; set; }
        public int FeeDueOnIntervalID { get; set; }
        public decimal Fee { get; set; }
        public Nullable<int> FeeDiscountTypeID { get; set; }
        public decimal DiscountRate { get; set; }
        public string DiscountOption { get; set; }
        public decimal DiscountValue { get; set; }
        public decimal NetFee { get; set; }
    
        public virtual FeeCycles FeeCycles { get; set; }
        public virtual FeeDiscountTypes FeeDiscountTypes { get; set; }
        public virtual FeeDueOnFrequencies FeeDueOnFrequencies { get; set; }
        public virtual FeeDueOnInterval FeeDueOnInterval { get; set; }
    }
}
