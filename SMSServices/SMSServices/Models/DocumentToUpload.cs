using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SMSServices.Models
{
    public partial class DocumentToUpload
    {
        public string FolderName{ get; set; }
        public string FileName { get; set; }
        public string DBOperation { get; set; }
        public string TableName { get; set; }
        public string FieldName { get; set; }
        public string WhereFieldName { get; set; }
        public int WhereFieldValue { get; set; }
        public string AllowedFileExt { get; set; }
        public int SizeInMBs { get; set; }

    }
}