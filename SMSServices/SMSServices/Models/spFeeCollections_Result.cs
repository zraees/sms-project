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
    
    public partial class spFeeCollections_Result
    {
        public int FeeCollectionID { get; set; }
        public int StudentClassId { get; set; }
        public int StudentId { get; set; }
        public int ShiftId { get; set; }
        public int ClassId { get; set; }
        public int SectionId { get; set; }
        public int BatchID { get; set; }
        public string FullName { get; set; }
        public string FullNameAr { get; set; }
        public string RollNo { get; set; }
        public string BatchName { get; set; }
        public string ClassName { get; set; }
        public string SectionName { get; set; }
        public string ShiftName { get; set; }
        public Nullable<decimal> TotalFee { get; set; }
        public Nullable<decimal> TotalPaid { get; set; }
        public Nullable<decimal> Balance { get; set; }
        public Nullable<decimal> TotalDueAmountAfterAddDisc { get; set; }
        public Nullable<System.DateTime> DueDate { get; set; }
        public int DueCount { get; set; }
        public int FeeStatusID { get; set; }
        public string FeeStatusName { get; set; }
    }
}
