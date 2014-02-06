using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web.Mvc;

namespace dotNet.Example.Controllers
{
    public class FileController : Controller
    {
        // GET api/file/5
        public ActionResult Get(int id)
        {
            string path = Server.MapPath("~/Files/software-architecture-for-developers-sample.pdf");

            return File(new FileStream(path, FileMode.Open, FileAccess.Read), "application/pdf", "sample.pdf");
        }

        // POST api/file
        public ActionResult Post(int id, string name)
        {
            string path = Server.MapPath("~/Files/software-architecture-for-developers-sample.pdf");

            return File(new FileStream(path, FileMode.Open, FileAccess.Read), "application/pdf", name);
        }

        public ActionResult ComplexPost(int id, string name, IEnumerable<string> array)
        {
            if (array != null && array.Count() == 2)
            {
                string path = Server.MapPath("~/Files/software-architecture-for-developers-sample.pdf");

                return File(new FileStream(path, FileMode.Open, FileAccess.Read), "application/pdf", name);
            }

            var errorResult = new JsonResult
            {
                Data = new { Error = true, ErrorMessage = "Failed." }
            };
            
            return errorResult;
        }

    }
}
