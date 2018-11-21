using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Abp.Application.Navigation;
using Abp.Runtime.Session;
using Abp.Threading;
using MyCompany.MyProject.Authorization.Users;
using MyCompany.MyProject.Web.Models.Layout;

namespace MyCompany.MyProject.Web.Controllers
{
    public class LayoutController : MyProjectControllerBase
    {
        private readonly IUserNavigationManager _userNavigationManager;
        private readonly UserManager _userManager;

        public LayoutController(
            IUserNavigationManager userNavigationManager, UserManager userManager)
        {
            _userNavigationManager = userNavigationManager;
            _userManager = userManager;
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

        [ChildActionOnly]
        public PartialViewResult UserInfo()
        {
            var name = string.Empty;
            if (AbpSession.UserId != null)
            {
                name = AsyncHelper.RunSync(() => _userManager.GetUserByIdAsync(AbpSession.UserId.Value)).Name;
            }
            
            return PartialView("_UserInfo", name);
        }
    }
}