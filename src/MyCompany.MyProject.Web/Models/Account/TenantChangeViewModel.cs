using Abp.AutoMapper;
using MyCompany.MyProject.Sessions.Dto;

namespace MyCompany.MyProject.Web.Models.Account
{
    [AutoMapFrom(typeof(GetCurrentLoginInformationsOutput))]
    public class TenantChangeViewModel
    {
        public TenantLoginInfoDto Tenant { get; set; }
    }
}