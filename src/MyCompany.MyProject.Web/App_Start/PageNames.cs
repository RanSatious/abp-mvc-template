namespace MyCompany.MyProject.Web
{
    public class PageNames
    {
        public const string Home = "Home";
        public const string About = "About";
        public const string Tenants = "Tenants";
        public const string Users = "Users";
        public const string Roles = "Roles";
        public const string Profile = "Profile";
        public const string User = "User";

        public static class Administration
        {
            public const string Index = "Administration";
            public const string Roles = "Administration.Roles";
            public const string Users = "Administration.Users";
            public const string AuditLogs = "Administration.AuditLogs";
            public const string OrganizationUnits = "Administration.OrganizationUnits";
            public const string Dictionary = "Administration.Dictionary";
            public const string ChangePassWord = "Administration.ChangePassWord";
        }

        public static class Sample
        {
            public const string Index = "Sample";
            public const string Table = "Sample.Table";
        }

        public static class Userinfo
        {
            public const string Index = "Userinfo";
            public const string ChangePassWord = "Userinfo.ChangePassWord";
            public const string PersonalInfo = "Userinfo.PersonalInfo";
        }
    }
}