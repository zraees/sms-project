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
    
        public virtual DbSet<Nationalities> Nationalities { get; set; }
        public virtual DbSet<Teachers> Teachers { get; set; }
        public virtual DbSet<QualificationTypes> QualificationTypes { get; set; }
        public virtual DbSet<TeacherQualifications> TeacherQualifications { get; set; }
        public virtual DbSet<Cities> Cities { get; set; }
        public virtual DbSet<Countries> Countries { get; set; }
        public virtual DbSet<States> States { get; set; }
        public virtual DbSet<TeacherExperiences> TeacherExperiences { get; set; }
    }
}
