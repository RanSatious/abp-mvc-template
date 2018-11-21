using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using Abp.Application.Services.Dto;
using Abp.Web.Mvc.Authorization;
using MyCompany.MyProject.Authorization;
using MyCompany.MyProject.Dictionarys;

namespace MyCompany.MyProject.Web.Controllers
{
    public class AdminController : MyProjectControllerBase
    {
        private readonly IDictionaryTypeAppService _dictionaryTypeAppService;
        public AdminController(IDictionaryTypeAppService dictionaryTypeAppService)
        {
            _dictionaryTypeAppService = dictionaryTypeAppService;
        }

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

        [AbpMvcAuthorize(PermissionNames.Pages_Administration_Dictionary)]
        public async Task<ActionResult> Dictionary()
        {
            var result = await _dictionaryTypeAppService.GetAll(new PagedAndSortedResultRequestDto() {SkipCount = 0, MaxResultCount = Int32.MaxValue});
            return View(result.Items);
        }

        [AbpMvcAuthorize(PermissionNames.Pages_Administration_Dictionary)]
        public ActionResult DictionaryType()
        {
            return View();
        }

        [AbpMvcAuthorize(PermissionNames.Pages_Administration_AuditLogs)]
        public ActionResult AuditLogs()
        {
            return View();
        }
    }
}