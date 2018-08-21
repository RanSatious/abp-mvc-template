using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Abp.Application.Navigation;
using Abp.Runtime.Session;
using Abp.Threading;
using MyCompany.MyProject.Web.Models.Layout;

namespace MyCompany.MyProject.Web.Controllers
{
    public class LayoutController : MyProjectControllerBase
    {
        private readonly IUserNavigationManager _userNavigationManager;

        public LayoutController(
            IUserNavigationManager userNavigationManager)
        {
            _userNavigationManager = userNavigationManager;
        }

        [ChildActionOnly]
        public PartialViewResult MainMenuNav(string activeMenu = "")
        {
            var model = new MainMenuNavViewModel()
            {
                MainMenu = AsyncHelper.RunSync(() => _userNavigationManager.GetMenuAsync("MainMenu", AbpSession.ToUserIdentifier())),
                ActiveMenuItemName = activeMenu
            };

            return PartialView("_MainMenuNav", model);
        }
    }
}