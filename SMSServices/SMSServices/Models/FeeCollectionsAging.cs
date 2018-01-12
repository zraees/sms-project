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
    
    public partial class FeeCollectionsAging
    {
        public FeeCollectionsAging()
        {
            this.FeePaymentsDetails = new HashSet<FeePaymentsDetails>();
        }
    
        public int FeeCollectionAgingID { get; set; }
        public int FeeCollectionDetailID { get; set; }
        public System.DateTime DueOn { get; set; }
        public decimal AdditionalDiscount { get; set; }
        public decimal DueAmount { get; set; }
        public Nullable<decimal> TotalPaidAmount { get; set; }
        public Nullable<int> FeePaymentStatusID { get; set; }
    
        public virtual FeeCollectionsDetails FeeCollectionsDetails { get; set; }
        public virtual FeePaymentStatus FeePaymentStatus { get; set; }
        public virtual ICollection<FeePaymentsDetails> FeePaymentsDetails { get; set; }
    }
}
