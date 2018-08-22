using System.Reflection;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using Abp;
using Abp.Configuration.Startup;
using Abp.Hangfire;
using Abp.Hangfire.Configuration;
using Abp.Localization.Dictionaries.Xml;
using Abp.Localization.Sources;
using Abp.Zero.Configuration;
using Abp.Modules;
using Abp.Web;
using Abp.Web.Mvc;
using Abp.Web.SignalR;
using MyCompany.MyProject.Api;
using Castle.MicroKernel.Registration;
using Hangfire;
using Microsoft.Owin.Security;

namespace MyCompany.MyProject.Web
{
    [DependsOn(
        typeof(MyProjectDataModule),
        typeof(MyProjectApplicationModule),
        typeof(MyProjectWebApiModule),
        typeof(AbpWebSignalRModule),
        //typeof(AbpHangfireModule), - ENABLE TO USE HANGFIRE INSTEAD OF DEFAULT JOB MANAGER
        typeof(AbpWebMvcModule))]
    public class MyProjectWebModule : AbpModule
    {
        public override void PreInitialize()
        {
            //Enable database based localization
            Configuration.Modules.Zero().LanguageManagement.EnableDbLocalization();

            //Configure navigation/menu
            Configuration.Navigation.Providers.Add<MyProjectNavigationProvider>();

            Configuration.Modules.AbpWeb().AntiForgery.IsEnabled = false;

            Configuration.Localization.Sources.Extensions.Add(
                new LocalizationSourceExtensionInfo(AbpWebConsts.LocalizaionSourceName,
                    new XmlFileLocalizationDictionaryProvider(
                        HttpContext.Current.Server.MapPath("~/Localization/AbpWebExtensions")
                    )
                )
            );
            Configuration.Localization.Sources.Extensions.Add(
                new LocalizationSourceExtensionInfo(AbpConsts.LocalizationSourceName,
                    new XmlFileLocalizationDictionaryProvider(
                        HttpContext.Current.Server.MapPath("~/Localization/AbpExtensions")
                    )
                )
            );

            //Configure Hangfire - ENABLE TO USE HANGFIRE INSTEAD OF DEFAULT JOB MANAGER
            //Configuration.BackgroundJobs.UseHangfire(configuration =>
            //{
            //    configuration.GlobalConfiguration.UseSqlServerStorage("Default");
            //});
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(Assembly.GetExecutingAssembly());

            IocManager.IocContainer.Register(
                Component
                    .For<IAuthenticationManager>()
                    .UsingFactoryMethod(() => HttpContext.Current.GetOwinContext().Authentication)
                    .LifestyleTransient()
            );

            AreaRegistration.RegisterAllAreas();
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }
    }
}
