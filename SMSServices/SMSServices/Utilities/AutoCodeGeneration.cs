using SMSServices.Helper;
using SMSServices.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SMSServices.Utilities
{
    public class AutoCodeGeneration
    {
        private SMSEntities entities = new SMSEntities();

        public string GenerateCode(string TableName, string PrimaryKeyName)
        {
            string format = GetFormat(TableName);
            
            bool isYearIncluded = IsPatternIncluded(format, "YY");
            bool isMonthIncluded = IsPatternIncluded(format, "DD");
            bool isDayIncluded = IsPatternIncluded(format, "MM");
            int SeqCount = GetSeqCount(format);
            int Seq = 1;
            string Code = "";

            string WhereClause = " 1=1 ";
            WhereClause += (WhereClause.Length > 0 && isYearIncluded ? " AND " : "") + 
                                string.Format(isYearIncluded ? " YEAR(CreatedOn) = {0}" : "", DateTime.Now.Year);
            WhereClause += (WhereClause.Length > 0 && isMonthIncluded ? " AND " : "") + 
                                string.Format(isMonthIncluded ? " MONTH(CreatedOn) = {0}" : "", DateTime.Now.Month);
            WhereClause += (WhereClause.Length > 0 && isDayIncluded ? " AND " : "") + 
                                string.Format(isDayIncluded ? " Day(CreatedOn) = {0}" : "", DateTime.Now.Day);

            IEnumerable<KeyValue> GeneratedCode = entities.Database.
               SqlQuery<KeyValue>(string.Format("SELECT MAX(RIGHT({0}, {1})) as Code FROM {2} WHERE {3}",
                                                   PrimaryKeyName, SeqCount, TableName, WhereClause)).ToList();

            if (GeneratedCode.FirstOrDefault().Code != null)
                int.TryParse(GeneratedCode.FirstOrDefault().Code,out Seq);

            Seq = Seq + 1;

            //format = "STD/YYYY/MM/DD/#####";
            Code = format.Replace("YYYY", DateTime.Now.Year.ToString().PadLeft(4,'0'))
                        .Replace("MM", DateTime.Now.Month.ToString().PadLeft(2,'0'))
                        .Replace("DD", DateTime.Now.Day.ToString().PadLeft(2, '0'))
                        .Replace("".PadLeft(SeqCount, '#'), Seq.ToString().PadLeft(SeqCount, '0'));

            return Code;
        }

        private string GetFormat(string TableName)
        {
            string format = "#####";

            CodingFormats CodingFormat = entities.CodingFormats.Where(n => n.TableName == TableName).FirstOrDefault();
            if (CodingFormat != null)
            {
                format = "" + CodingFormat.Format;
            }

            return format;
        }

        private int GetSeqCount(string format)
        {
            return format.Length - format.IndexOf("#");
        }

        private bool IsPatternIncluded(string format, string Pattern)
        {
            return format.IndexOf(Pattern) > -1;
        }

        public string GenerateCode(string TableName, string CodeColName, Dictionary<object, object> conditions)
        {
            string format = GetFormat(TableName);

            bool isYearIncluded = IsPatternIncluded(format, "YY");
            bool isMonthIncluded = IsPatternIncluded(format, "DD");
            bool isDayIncluded = IsPatternIncluded(format, "MM");
            int SeqCount = GetSeqCount(format);
            int Seq = 1;
            string Code = "";

            string WhereClause = " 1=1 ";
            WhereClause += (WhereClause.Length > 0 && isYearIncluded ? " AND " : "") +
                                string.Format(isYearIncluded ? " YEAR(CreatedOn) = {0}" : "", DateTime.Now.Year);
            WhereClause += (WhereClause.Length > 0 && isMonthIncluded ? " AND " : "") +
                                string.Format(isMonthIncluded ? " MONTH(CreatedOn) = {0}" : "", DateTime.Now.Month);
            WhereClause += (WhereClause.Length > 0 && isDayIncluded ? " AND " : "") +
                                string.Format(isDayIncluded ? " Day(CreatedOn) = {0}" : "", DateTime.Now.Day);

            foreach (var item in conditions)
                WhereClause += (WhereClause.Length > 0 ? " AND " : "") + string.Format(" {0} = '{1}'", item.Key, item.Value);
            

            IEnumerable<KeyValue> GeneratedCode = entities.Database.
               SqlQuery<KeyValue>(string.Format("SELECT MAX(RIGHT({0}, {1})) as Code FROM {2} WHERE {3}",
                                                   CodeColName, SeqCount, TableName, WhereClause)).ToList();

            if (GeneratedCode.FirstOrDefault().Code != null)
                int.TryParse(GeneratedCode.FirstOrDefault().Code, out Seq);

            Seq = Seq + 1;

            //format = "STD/YYYY/MM/DD/#####";
            Code = format.Replace("YYYY", DateTime.Now.Year.ToString().PadLeft(4, '0'))
                        .Replace("MM", DateTime.Now.Month.ToString().PadLeft(2, '0'))
                        .Replace("DD", DateTime.Now.Day.ToString().PadLeft(2, '0'))
                        .Replace("".PadLeft (SeqCount, '#'), Seq.ToString().PadLeft(SeqCount, '0'));

            return Code;
        }
    }
}