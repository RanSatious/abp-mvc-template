using Abp.Authorization;
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
            dictionary.CreateChildPermission(PermissionNames.Pages_Administration_Dictionary_Type, L("DictionaryType"));
            dictionary.CreateChildPermission(PermissionNames.Pages_Administration_Dictionary_Create, L("CreateDictionary"));
            dictionary.CreateChildPermission(PermissionNames.Pages_Administration_Dictionary_Delete, L("DeleteDictionary"));
            dictionary.CreateChildPermission(PermissionNames.Pages_Administration_Dictionary_Edit, L("EditDictionary"));

            administration.CreateChildPermission(PermissionNames.Pages_Administration_AuditLogs, L("AuditLogs"));
            administration.CreateChildPermission(PermissionNames.Pages_Administration_Setting, L("Setting"));
        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, MyProjectConsts.LocalizationSourceName);
        }
    }
}
