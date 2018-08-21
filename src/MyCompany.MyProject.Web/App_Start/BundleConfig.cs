using System.Web.Optimization;

namespace MyCompany.MyProject.Web
{
    public static class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.IgnoreList.Clear();
        }
    }
}