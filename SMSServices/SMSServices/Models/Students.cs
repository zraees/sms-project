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
    
    public partial class Students
    {
        public Students()
        {
            this.Admissions = new HashSet<Admissions>();
            this.StudentsClasses = new HashSet<StudentsClasses>();
        }
    
        public int StudentId { get; set; }
        public string Code { get; set; }
        public string Name1 { get; set; }
        public string Name2 { get; set; }
        public string Name3 { get; set; }
        public string Name4 { get; set; }
        public string FullName { get; set; }
        public string NameAr1 { get; set; }
        public string NameAr2 { get; set; }
        public string NameAr3 { get; set; }
        public string NameAr4 { get; set; }
        public string FullNameAr { get; set; }
        public Nullable<System.DateTime> DOB { get; set; }
        public string FullNamePassport { get; set; }
        public string FullNameArPassport { get; set; }
        public string FatherIDNo { get; set; }
        public string StudentIDNo { get; set; }
        public string PlaceOfBirth { get; set; }
        public Nullable<int> NationalityId { get; set; }
        public string Email { get; set; }
        public string Gender { get; set; }
        public Nullable<int> Lang1ID { get; set; }
        public Nullable<int> Lang2Id { get; set; }
        public Nullable<int> ReligionId { get; set; }
        public string PhoneNo { get; set; }
        public string MobileNo { get; set; }
        public Nullable<int> CountryId { get; set; }
        public Nullable<int> StateId { get; set; }
        public Nullable<int> CityId { get; set; }
        public string Address { get; set; }
        public string StudentStayWith { get; set; }
        public string StudentStayWithOther { get; set; }
        public Nullable<bool> HasSameSchoolAttendedBefore { get; set; }
        public Nullable<System.DateTime> SchoolAttendedStartDate { get; set; }
        public Nullable<System.DateTime> SchoolAttendedEndDate { get; set; }
        public Nullable<bool> HasStudentEverSkippedGrade { get; set; }
        public string SkippedGrades { get; set; }
        public Nullable<bool> HasStudentRepeatGrade { get; set; }
        public string RepeatGrades { get; set; }
        public Nullable<System.DateTime> CreatedOn { get; set; }
        public string StudentPic { get; set; }
    
        public virtual ICollection<Admissions> Admissions { get; set; }
        public virtual Cities Cities { get; set; }
        public virtual Countries Countries { get; set; }
        public virtual Countries Countries1 { get; set; }
        public virtual Languages Languages { get; set; }
        public virtual Languages Languages1 { get; set; }
        public virtual Religions Religions { get; set; }
        public virtual States States { get; set; }
        public virtual ICollection<StudentsClasses> StudentsClasses { get; set; }
    }
}
