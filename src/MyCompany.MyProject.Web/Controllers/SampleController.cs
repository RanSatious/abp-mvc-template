using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Abp.Web.Mvc.Authorization;

namespace MyCompany.MyProject.Web.Controllers
{
    [AbpMvcAuthorize]
    public class SampleController : MyProjectControllerBase
    {
        // GET: Sample
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Table()
        {
            return View();
        }
    }
}