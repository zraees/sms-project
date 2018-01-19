using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SMSServices.Models
{
    public class SampleData
    {
        public string[,] StudentNames
        {
            get
            {
                return new string[2, 10] { { "Noor", "Aabidah", "Yasmin", "Dimah", "Jazmin", "Rida", "Sarah", "Karimah", "Dunya", "Nashita" },
                                           { "Muhammad", "Ahmad", "Ali", "Usman", "Abdullah", "Faysal", "Abdul Majeed", "Abdur Reham", "Aaliyan", "Azlan" }};
            }
            private set { }
        }


        public string[,] StudentNamesAr
        {
            get
            {
                return new string[2, 10] { { "نور" , "عابدة" , "ياسمين" , "ديماه" , "جازمين" , "رضا" , "سارة" , "كريمة" ,"دونيا","ناشيتا" },
                                            { "محمد", "أحمد", "علي", "عثمان", "عبدالله", "فيصل", "عبد المجيد", "عبد الرحمن", "آليان", "أزلان" } };
            }
            private set { }
        }
        //public string[,] Students
        //{
        //    get
        //    {
        //        return new string[,] {{"a","b","c",""},
        //                              {"d","e","f"}, 
        //                              {"g","h","i"} };
        //    }
        //    private set { }
        //}
    }
}