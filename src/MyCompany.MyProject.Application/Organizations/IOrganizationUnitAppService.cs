using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Ideayapai.Bridge.Health.Organizations.Dto;

namespace Ideayapai.Bridge.Health.Organizations
{
    public interface IOrganizationUnitAppService : IApplicationService
    {
        Task<ListResultDto<OrganizationUnitDto>> GetOrganizationUnits();

        Task<OrganizationUnitDto> CreateOrganizationUnit(CreateOrganizationUnitInput input);

        Task<OrganizationUnitDto> UpdateOrganizationUnit(UpdateOrganizationUnitInput input);

        Task DeleteOrganizationUnit(long id);
    }
}
