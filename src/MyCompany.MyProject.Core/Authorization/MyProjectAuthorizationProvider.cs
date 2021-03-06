﻿using Abp.Authorization;
using Abp.Localization;
using Abp.MultiTenancy;

namespace MyCompany.MyProject.Authorization
{
    public class MyProjectAuthorizationProvider : AuthorizationProvider
    {
        public override void SetPermissions(IPermissionDefinitionContext context)
        {
            var pages = context.GetPermissionOrNull(PermissionNames.Pages) ?? context.CreatePermission(PermissionNames.Pages, L("Pages"));

            pages.CreateChildPermission(PermissionNames.Pages_Home, L("Home"));

            pages.CreateChildPermission(PermissionNames.Pages_Profile, L("Profile"));

            var administration = pages.CreateChildPermission(PermissionNames.Pages_Administration, L("Administration"));
            administration.CreateChildPermission(PermissionNames.Pages_Administration_Users, L("Users"));
            administration.CreateChildPermission(PermissionNames.Pages_Administration_Roles, L("Roles"));
            administration.CreateChildPermission(PermissionNames.Pages_Administration_OrganizationUnits, L("OrganizationUnits"));

            var dictionary = administration.CreateChildPermission(PermissionNames.Pages_Administration_Dictionary, L("Dictionary"));

            var userinfo = pages.CreateChildPermission(PermissionNames.Page_Userinfo, L("User"));
            userinfo.CreateChildPermission(PermissionNames.Page_Userinfo_ChangePassWord, L("ChangePassWord"));
            userinfo.CreateChildPermission(PermissionNames.Page_Userinfo_PersonalInfo, L("PersonalInfo"));

            administration.CreateChildPermission(PermissionNames.Pages_Administration_AuditLogs, L("AuditLogs"));
            administration.CreateChildPermission(PermissionNames.Pages_Administration_Setting, L("Setting"));
        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, MyProjectConsts.LocalizationSourceName);
        }
    }
}
