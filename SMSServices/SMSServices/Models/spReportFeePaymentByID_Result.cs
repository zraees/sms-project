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
    
    public partial class spReportFeePaymentByID_Result
    {
        public Nullable<long> SrNo { get; set; }
        public int FeePaymentID { get; set; }
        public string FeePaymentCode { get; set; }
        public System.DateTime PaidOn { get; set; }
        public string Comments { get; set; }
        public Nullable<System.DateTime> CreatedOn { get; set; }
        public string StudentsCode { get; set; }
        public string FullName { get; set; }
        public string FullNameAr { get; set; }
        public string RollNo { get; set; }
        public string BatchName { get; set; }
        public string BatchNameAr { get; set; }
        public string ShiftName { get; set; }
        public string ShiftNameAr { get; set; }
        public string ClassName { get; set; }
        public string ClassNameAr { get; set; }
        public string SectionName { get; set; }
        public string SectionNameAr { get; set; }
        public string FeeTypeCode { get; set; }
        public string FeeTypeName { get; set; }
        public string FeeTypeNameAr { get; set; }
        public Nullable<decimal> PaidAmount { get; set; }
        public decimal TotalPaidAmount { get; set; }
        public decimal Balance { get; set; }
    }
}