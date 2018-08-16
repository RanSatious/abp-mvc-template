using System.Threading.Tasks;
using Abp.Application.Services;
using MyCompany.MyProject.Configuration.Dto;

namespace MyCompany.MyProject.Configuration
{
    public interface IConfigurationAppService: IApplicationService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}