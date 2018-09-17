using Abp.Application.Navigation;
using Abp.Localization;
using MyCompany.MyProject.Authorization;

namespace MyCompany.MyProject.Web
{
    /// <summary>
    /// This class defines menus for the application.
    /// It uses ABP's menu system.
    /// When you add menu items here, they are automatically appear in angular application.
    /// See Views/Layout/_TopMenu.cshtml file to know how to render menu.
    /// </summary>
    public class MyProjectNavigationProvider : NavigationProvider
    {
        public override void SetNavigation(INavigationProviderContext context)
        {
            context.Manager.MainMenu
                .AddItem(
                    new MenuItemDefinition(
                        PageNames.Home,
                        L("HomePage"),
                        url: "",
                        icon: "home",
                        requiresAuthentication: true
                    )
                ).AddItem(
                    new MenuItemDefinition(
                        PageNames.Profile,
                        L("Profile"),
                        url: "Profile",
                        icon: "",
                        requiresAuthentication: true
                    )
                ).AddItem(
                    new MenuItemDefinition(
                        PageNames.Administration.Index,
                        L("Admin"),
                        url: "Admin",
                        icon: "",
                        requiredPermissionName: PermissionNames.Pages_Administration
                    ).AddItem(
                        new MenuItemDefinition(
                            PageNames.Administration.Users,
                            L("Users"),
                            url: "Admin/Users",
                            icon: "",
                            requiredPermissionName: PermissionNames.Pages_Administration_Users
                        )
                    ).AddItem(
                        new MenuItemDefinition(
                            PageNames.Administration.Roles,
                            L("Roles"),
                            url: "Admin/Roles",
                            icon: "",
                            requiredPermissionName: PermissionNames.Pages_Administration_Roles
                        )
                    ).AddItem(
                        new MenuItemDefinition(
                            PageNames.Administration.OrganizationUnits,
                            L("OrganizationUnits"),
                            url: "Admin/Organizations",
                            icon: "",
                            requiredPermissionName: PermissionNames.Pages_Administration_OrganizationUnits
                        )
                    )
                    .AddItem(new MenuItemDefinition(
                        PageNames.Administration.Dictionary,
                        L("Dictionary"),
                        url: "Admin/Dictionary",
                        icon: "",
                        requiredPermissionName: PermissionNames.Pages_Administration_Dictionary
                        ))
                    .AddItem(new MenuItemDefinition(
                    PageNames.Administration.AuditLogs,
                    L("AuditLogs"),
                    url: "Admin/AuditLogs",
                    icon: "",
                    requiredPermissionName: PermissionNames.Pages_Administration_AuditLogs
                    ))
                ).AddItem(
                    new MenuItemDefinition(
                        PageNames.Sample.Index,
                        L("Sample"),
                        url: "Sample",
                        icon: "",
                        requiresAuthentication: true
                    ).AddItem(
                        new MenuItemDefinition(
                            PageNames.Sample.Table,
                            L("Table"),
                            url: "Sample/Table",
                            icon: "",
                            requiresAuthentication: true
                        )
                    )
                );
        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, MyProjectConsts.LocalizationSourceName);
        }
    }
}
