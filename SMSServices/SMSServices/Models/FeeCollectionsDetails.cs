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
    
    public partial class FeeCollectionsDetails
    {
        public FeeCollectionsDetails()
        {
            this.FeeCollectionsAging = new HashSet<FeeCollectionsAging>();
        }
    
        public int FeeCollectionDetailID { get; set; }
        public int FeeCollectionID { get; set; }
        public int FeeStructureID { get; set; }
        public decimal Fee { get; set; }
        public Nullable<int> FeeDiscountTypeID { get; set; }
        public decimal DiscountRate { get; set; }
        public string DiscountOption { get; set; }
        public decimal DiscountValue { get; set; }
        public decimal NetFee { get; set; }
    
        public virtual FeeCollections FeeCollections { get; set; }
        public virtual FeeDiscountTypes FeeDiscountTypes { get; set; }
        public virtual FeeStructures FeeStructures { get; set; }
        public virtual ICollection<FeeCollectionsAging> FeeCollectionsAging { get; set; }
    }
}