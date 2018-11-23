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
        public PartialViewResult MainMenuNav(string activeMenu = "", bool isLeft = true)
        {
            var model = new MainMenuNavViewModel()
            {
                MainMenu = AsyncHelper.RunSync(() => _userNavigationManager.GetMenuAsync("MainMenu", AbpSession.ToUserIdentifier())),
                ActiveMenuItemName = activeMenu,
                IsLeft  = isLeft
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

        [ChildActionOnly]
        public PartialViewResult BreadCrumb(string activeMenu = "")
        {
            var mainMenu = AsyncHelper.RunSync(() => _userNavigationManager.GetMenuAsync("MainMenu", AbpSession.ToUserIdentifier()));
            var homeMenu = mainMenu.Items[0];

            var activeNames = new List<string>();
            var parent = string.Empty;
            foreach (string name in activeMenu.Split('.'))
            {
                activeNames.Add(string.IsNullOrEmpty(parent) ? name : $"{parent}.{name}");
                parent = activeNames.Last();
            }

            var activeMenus = new List<UserMenuItem>();
            UserMenuItem parentMenu = null;
            foreach (var name in activeNames)
            {
                var sub = (parentMenu == null ? mainMenu.Items : parentMenu.Items).FirstOrDefault(d => d.Name == name);
                if (sub != null)
                {
                    activeMenus.Add(sub);
                    parentMenu = sub;
                }
            }

            if (activeMenus.Count > 0 && activeMenus[0].Name != PageNames.Home)
            {
                activeMenus.Insert(0, homeMenu);
            }

            return PartialView("_BreadCrumb", activeMenus);
        }
    }
}