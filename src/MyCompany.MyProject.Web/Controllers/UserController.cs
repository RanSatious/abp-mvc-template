using Abp.Web.Mvc.Authorization;
using MyCompany.MyProject.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MyCompany.MyProject.Web.Controllers
{
    public class UserController : Controller
    {
        // GET: User
        public ActionResult Index()
        {
            return RedirectToAction("Index", "Home");
        }
        [AbpMvcAuthorize(PermissionNames.Page_Userinfo_ChangePassWord)]
        public ActionResult ChangePassword() {
            return View();
        }
        [AbpMvcAuthorize(PermissionNames.Page_Userinfo_PersonalInfo)]
        public ActionResult PersonalInfo(){
            return View();
        }
    }
}