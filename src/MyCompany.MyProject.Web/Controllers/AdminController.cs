using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Abp.Web.Mvc.Authorization;
using MyCompany.MyProject.Authorization;

namespace MyCompany.MyProject.Web.Controllers
{
    public class AdminController : MyProjectControllerBase
    {
        public ActionResult Index()
        {
            return RedirectToAction("Index", "Home");
        }

        [AbpMvcAuthorize(PermissionNames.Pages_Administration_Users)]
        public ActionResult Users()
        {
            return View();
        }

        [AbpMvcAuthorize(PermissionNames.Pages_Administration_Roles)]
        public ActionResult Roles()
        {
            return View();
        }

        [AbpMvcAuthorize(PermissionNames.Pages_Administration_OrganizationUnits)]
        public ActionResult Organizations()
        {
            return View();
        }
    }
}