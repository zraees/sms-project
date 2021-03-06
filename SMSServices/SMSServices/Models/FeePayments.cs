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
    
    public partial class FeePayments
    {
        public FeePayments()
        {
            this.FeePaymentsDetails = new HashSet<FeePaymentsDetails>();
        }
    
        public int FeePaymentID { get; set; }
        public int StudentClassId { get; set; }
        public string Code { get; set; }
        public System.DateTime PaidOn { get; set; }
        public string Comments { get; set; }
        public decimal TotalPaidAmount { get; set; }
        public decimal DiscountAmount { get; set; }
        public decimal Balance { get; set; }
        public int PaymentModeID { get; set; }
        public string FeeCollectedBy { get; set; }
        public System.DateTime CreatedOn { get; set; }
    
        public virtual PaymentModes PaymentModes { get; set; }
        public virtual StudentsClasses StudentsClasses { get; set; }
        public virtual ICollection<FeePaymentsDetails> FeePaymentsDetails { get; set; }
    }
}
