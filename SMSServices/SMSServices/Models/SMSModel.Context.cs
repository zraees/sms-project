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
    
        public virtual DbSet<QualificationTypes> QualificationTypes { get; set; }
        public virtual DbSet<TeacherQualifications> TeacherQualifications { get; set; }
        public virtual DbSet<TeacherExperiences> TeacherExperiences { get; set; }
        public virtual DbSet<Errors> Errors { get; set; }
        public virtual DbSet<Admissions> Admissions { get; set; }
        public virtual DbSet<Languages> Languages { get; set; }
        public virtual DbSet<Religions> Religions { get; set; }
        public virtual DbSet<ClassesSections> ClassesSections { get; set; }
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
        public virtual DbSet<StudentsClasses> StudentsClasses { get; set; }
        public virtual DbSet<Subjects> Subjects { get; set; }
        public virtual DbSet<SubjectTypes> SubjectTypes { get; set; }
        public virtual DbSet<Teachers> Teachers { get; set; }
        public virtual DbSet<TeachersSubjects> TeachersSubjects { get; set; }
        public virtual DbSet<TimeTables> TimeTables { get; set; }
        public virtual DbSet<TimeTableDetails> TimeTableDetails { get; set; }
        public virtual DbSet<FeeCycles> FeeCycles { get; set; }
        public virtual DbSet<FeeDiscountTypes> FeeDiscountTypes { get; set; }
        public virtual DbSet<FeeDueOnFrequencies> FeeDueOnFrequencies { get; set; }
        public virtual DbSet<FeeDueOnInterval> FeeDueOnInterval { get; set; }
        public virtual DbSet<FeeTypes> FeeTypes { get; set; }
        public virtual DbSet<FeeStructures> FeeStructures { get; set; }
    }
}
