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
    
    public partial class FeeCollections
    {
        public FeeCollections()
        {
            this.FeeCollectionsDetails = new HashSet<FeeCollectionsDetails>();
        }
    
        public int FeeCollectionID { get; set; }
        public int StudentClassId { get; set; }
    
        public virtual StudentsClasses StudentsClasses { get; set; }
        public virtual ICollection<FeeCollectionsDetails> FeeCollectionsDetails { get; set; }
    }
}
