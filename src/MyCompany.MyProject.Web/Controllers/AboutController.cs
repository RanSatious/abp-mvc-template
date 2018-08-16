using System.Web.Mvc;

namespace MyCompany.MyProject.Web.Controllers
{
    public class AboutController : MyProjectControllerBase
    {
        public ActionResult Index()
        {
            return View();
        }
	}
}