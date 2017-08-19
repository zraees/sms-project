using SMSServices.Helper;
using SMSServices.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace SMSServices.Controllers
{
    public class UploadController : ApiController
    {
        //private SMSEntities entities = new SMSEntities();

        [Route("api/PostImage")]            ///{FolderName}/{FileName}
        [AllowAnonymous]
        public HttpResponseMessage PostImage()
        {
            Dictionary<string, object> dict = new Dictionary<string, object>();
            try
            {
                DocumentToUpload Document;
                var httpRequest = HttpContext.Current.Request; 

                string FolderName = ""+httpRequest.Params["folderName"];
                string FileName = "" + httpRequest.Params["fileName"];
                string DBOperation = "" + httpRequest.Params["dbOperation"];
                string TableName = "" + httpRequest.Params["tableName"];
                string FieldName = "" + httpRequest.Params["fieldName"];
                string WhereFieldName = "" + httpRequest.Params["whereFieldName"];
                int WhereFieldValue = Convert.ToInt32("0" + httpRequest.Params["whereFieldValue"]);
                string AllowedFileExt = "" + httpRequest.Params["allowedFileExt"];
                int SizeInMBs = Convert.ToInt32("0" + httpRequest.Params["sizeInMBs"]);

                SizeInMBs = SizeInMBs <= 0 ? 1 : SizeInMBs;

                Document = new DocumentToUpload()
                {
                    FolderName = FolderName,
                    FileName = FileName,
                    DBOperation = DBOperation,
                    TableName = TableName,
                    FieldName = FieldName,
                    WhereFieldName = WhereFieldName,
                    WhereFieldValue = WhereFieldValue,
                    AllowedFileExt = AllowedFileExt,
                    SizeInMBs = SizeInMBs
                };

                foreach (string file in httpRequest.Files)
                {
                    HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created);
                     
                    var postedFile = httpRequest.Files[file];
                    if (postedFile != null && postedFile.ContentLength > 0)
                    {

                        int MaxContentLength = 1024 * 1024 * SizeInMBs; //Size = 1 MB  

                        IList<string> AllowedFileExtensions = AllowedFileExt.Split(',').ToList();//new List<string> { ".jpg", ".gif", ".png" };
                        var ext = postedFile.FileName.Substring(postedFile.FileName.LastIndexOf('.'));
                        var extension = ext.ToLower();
                        if (!AllowedFileExtensions.Contains(extension))
                        {

                            var message = string.Format("Please Upload image of type {0}", AllowedFileExt);

                            dict.Add("error", message);
                            return Request.CreateResponse(HttpStatusCode.BadRequest, dict);
                        }
                        else if (postedFile.ContentLength > MaxContentLength)
                        {

                            var message = string.Format("Please Upload a file upto {0} MBs.", SizeInMBs);

                            dict.Add("error", message);
                            return Request.CreateResponse(HttpStatusCode.BadRequest, dict);
                        }
                        else
                        {
                            var filePath = HttpContext.Current.Server.MapPath(string.Format("~/Content/{0}/{1}", FolderName, FileName + extension));  //postedFile.FileName   //+ extension
                            Document.FileName = FileName + extension;
                            postedFile.SaveAs(filePath);

                            DBAction(Document);
                        }
                    }

                    var message1 = string.Format("Image Updated Successfully.");
                    return Request.CreateErrorResponse(HttpStatusCode.Created, message1); ;
                }
                var res = string.Format("Please Upload a image.");
                dict.Add("error", res);
                return Request.CreateResponse(HttpStatusCode.NotFound, dict);
            }
            catch (Exception ex)
            {
                var res = string.Format("some Message ==> " + ex.Message);
                dict.Add("error", res);
                return Request.CreateResponse(HttpStatusCode.NotFound, dict);
            }
        }

        private void DBAction(DocumentToUpload Document)
        {
            using (var context = new SMSEntities())
            {
                string query = string.Empty;
                if (Document.DBOperation.ToLower().Equals("insert"))
                { 
                    query = string.Format ("INSERT INTO {0} ({1}, {2}) VALUES ({3}, '{4}')",
                                Document.TableName, Document.WhereFieldName, Document.FieldName,
                                Document.WhereFieldValue, Document.FileName);
                }
                else
                {
                    query = string.Format("{0} {1} SET {2} = '{3}' WHERE {4} = {5}",
                                  Document.DBOperation, Document.TableName, Document.FieldName, Document.FileName,
                                  Document.WhereFieldName, Document.WhereFieldValue);
                }

                context.Database.ExecuteSqlCommand(query);
            }
        }

        protected override void Dispose(bool disposing)
        {
            //if (disposing)
            //{
            //    entities.Dispose();
            //}
            base.Dispose(disposing);
        }
    } 
}