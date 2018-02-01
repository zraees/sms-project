﻿//------------------------------------------------------------------------------
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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    using System.Data.Entity.Core.Objects;
    using System.Linq;
    
    public partial class SMSEntities : DbContext
    {
        public SMSEntities()
            : base("name=SMSEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<TeacherQualifications> TeacherQualifications { get; set; }
        public virtual DbSet<TeacherExperiences> TeacherExperiences { get; set; }
        public virtual DbSet<Errors> Errors { get; set; }
        public virtual DbSet<Admissions> Admissions { get; set; }
        public virtual DbSet<Languages> Languages { get; set; }
        public virtual DbSet<Religions> Religions { get; set; }
        public virtual DbSet<TeachersClasses> TeachersClasses { get; set; }
        public virtual DbSet<Cities> Cities { get; set; }
        public virtual DbSet<States> States { get; set; }
        public virtual DbSet<CodingFormats> CodingFormats { get; set; }
        public virtual DbSet<StudentsEmergencyContactDetails> StudentsEmergencyContactDetails { get; set; }
        public virtual DbSet<Days> Days { get; set; }
        public virtual DbSet<Locations> Locations { get; set; }
        public virtual DbSet<Batches> Batches { get; set; }
        public virtual DbSet<Classes> Classes { get; set; }
        public virtual DbSet<Countries> Countries { get; set; }
        public virtual DbSet<Sections> Sections { get; set; }
        public virtual DbSet<Shifts> Shifts { get; set; }
        public virtual DbSet<Students> Students { get; set; }
        public virtual DbSet<Subjects> Subjects { get; set; }
        public virtual DbSet<SubjectTypes> SubjectTypes { get; set; }
        public virtual DbSet<Teachers> Teachers { get; set; }
        public virtual DbSet<TeachersSubjects> TeachersSubjects { get; set; }
        public virtual DbSet<TimeTables> TimeTables { get; set; }
        public virtual DbSet<TimeTableDetails> TimeTableDetails { get; set; }
        public virtual DbSet<ClassesSections> ClassesSections { get; set; }
        public virtual DbSet<FeeCollections> FeeCollections { get; set; }
        public virtual DbSet<FeeCollectionsDetails> FeeCollectionsDetails { get; set; }
        public virtual DbSet<FeeCycles> FeeCycles { get; set; }
        public virtual DbSet<FeeDiscountTypes> FeeDiscountTypes { get; set; }
        public virtual DbSet<FeeDueOnFrequencies> FeeDueOnFrequencies { get; set; }
        public virtual DbSet<FeeDueOnInterval> FeeDueOnInterval { get; set; }
        public virtual DbSet<FeeStructures> FeeStructures { get; set; }
        public virtual DbSet<FeeTypes> FeeTypes { get; set; }
        public virtual DbSet<StudentsClasses> StudentsClasses { get; set; }
        public virtual DbSet<FeePaymentStatus> FeePaymentStatus { get; set; }
        public virtual DbSet<FeeStatus> FeeStatus { get; set; }
        public virtual DbSet<FeeCollectionsAging> FeeCollectionsAging { get; set; }
        public virtual DbSet<FeePaymentsDetails> FeePaymentsDetails { get; set; }
        public virtual DbSet<QualificationTypes> QualificationTypes { get; set; }
        public virtual DbSet<FeePayments> FeePayments { get; set; }
        public virtual DbSet<PaymentModes> PaymentModes { get; set; }
    
        public virtual int spDeleteTables(string level)
        {
            var levelParameter = level != null ?
                new ObjectParameter("level", level) :
                new ObjectParameter("level", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("spDeleteTables", levelParameter);
        }
    
        public virtual ObjectResult<Nullable<decimal>> spFeeOutstandingByAgingID(Nullable<int> feeCollectionAgingID)
        {
            var feeCollectionAgingIDParameter = feeCollectionAgingID.HasValue ?
                new ObjectParameter("FeeCollectionAgingID", feeCollectionAgingID) :
                new ObjectParameter("FeeCollectionAgingID", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Nullable<decimal>>("spFeeOutstandingByAgingID", feeCollectionAgingIDParameter);
        }
    
        public virtual ObjectResult<spFeeDueDetailsByStudentID_Result> spFeeDueDetailsByStudentID(string lang, Nullable<int> studentId)
        {
            var langParameter = lang != null ?
                new ObjectParameter("lang", lang) :
                new ObjectParameter("lang", typeof(string));
    
            var studentIdParameter = studentId.HasValue ?
                new ObjectParameter("StudentId", studentId) :
                new ObjectParameter("StudentId", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<spFeeDueDetailsByStudentID_Result>("spFeeDueDetailsByStudentID", langParameter, studentIdParameter);
        }
    
        public virtual ObjectResult<spReportFeePaymentByID_Result> spReportFeePaymentByID(string lang, Nullable<int> feePaymentID)
        {
            var langParameter = lang != null ?
                new ObjectParameter("lang", lang) :
                new ObjectParameter("lang", typeof(string));
    
            var feePaymentIDParameter = feePaymentID.HasValue ?
                new ObjectParameter("FeePaymentID", feePaymentID) :
                new ObjectParameter("FeePaymentID", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<spReportFeePaymentByID_Result>("spReportFeePaymentByID", langParameter, feePaymentIDParameter);
        }
    
        public virtual ObjectResult<spFeePaymentDetailsByStudentID_Result> spFeePaymentDetailsByStudentID(string lang, Nullable<int> studentId)
        {
            var langParameter = lang != null ?
                new ObjectParameter("lang", lang) :
                new ObjectParameter("lang", typeof(string));
    
            var studentIdParameter = studentId.HasValue ?
                new ObjectParameter("StudentId", studentId) :
                new ObjectParameter("StudentId", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<spFeePaymentDetailsByStudentID_Result>("spFeePaymentDetailsByStudentID", langParameter, studentIdParameter);
        }
    
        public virtual ObjectResult<spFeeCollections_Result> spFeeCollections(string lang, Nullable<int> shiftId, Nullable<int> classId, Nullable<int> sectionId, Nullable<int> batchId, Nullable<int> studentId)
        {
            var langParameter = lang != null ?
                new ObjectParameter("lang", lang) :
                new ObjectParameter("lang", typeof(string));
    
            var shiftIdParameter = shiftId.HasValue ?
                new ObjectParameter("ShiftId", shiftId) :
                new ObjectParameter("ShiftId", typeof(int));
    
            var classIdParameter = classId.HasValue ?
                new ObjectParameter("ClassId", classId) :
                new ObjectParameter("ClassId", typeof(int));
    
            var sectionIdParameter = sectionId.HasValue ?
                new ObjectParameter("SectionId", sectionId) :
                new ObjectParameter("SectionId", typeof(int));
    
            var batchIdParameter = batchId.HasValue ?
                new ObjectParameter("BatchId", batchId) :
                new ObjectParameter("BatchId", typeof(int));
    
            var studentIdParameter = studentId.HasValue ?
                new ObjectParameter("StudentId", studentId) :
                new ObjectParameter("StudentId", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<spFeeCollections_Result>("spFeeCollections", langParameter, shiftIdParameter, classIdParameter, sectionIdParameter, batchIdParameter, studentIdParameter);
        }
    }
}
