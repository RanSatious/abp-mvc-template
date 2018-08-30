using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Authorization.Users;
using Abp.AutoMapper;
using Abp.Domain.Repositories;
using Abp.Linq.Extensions;
using Abp.Organizations;
using Abp.UI;
using Ideayapai.Bridge.Health.Organizations.Dto;
using MyCompany.MyProject;
using MyCompany.MyProject.Authorization;
using MyCompany.MyProject.Authorization.Users;

namespace Ideayapai.Bridge.Health.Organizations
{
    [AbpAuthorize(PermissionNames.Pages_Administration_OrganizationUnits)]
    public class OrganizationUnitAppService : MyProjectAppServiceBase, IOrganizationUnitAppService
    {
        private readonly OrganizationUnitManager _organizationUnitManager;
        private readonly IRepository<OrganizationUnit, long> _organizationUnitRepository;
        private readonly IRepository<User, long> _userRepository;

        public OrganizationUnitAppService(
            OrganizationUnitManager organizationUnitManager,
            IRepository<OrganizationUnit, long> organizationUnitRepository,
            IRepository<User, long> userRepository)
        {
            _organizationUnitManager = organizationUnitManager;
            _organizationUnitRepository = organizationUnitRepository;
            _userRepository = userRepository;
        }

        public async Task<ListResultDto<OrganizationUnitDto>> GetOrganizationUnits()
        {
            var items = await _organizationUnitRepository.GetAll().ToListAsync();

            return new ListResultDto<OrganizationUnitDto>(
                items.Select(item =>
                {
                    var dto = item.MapTo<OrganizationUnitDto>();
                    return dto;
                }).ToList());
        }

        public async Task<OrganizationUnitDto> CreateOrganizationUnit(CreateOrganizationUnitInput input)
        {
            var organizationUnit = new OrganizationUnit(AbpSession.TenantId, input.DisplayName, input.ParentId);

            await _organizationUnitManager.CreateAsync(organizationUnit);
            await CurrentUnitOfWork.SaveChangesAsync();

            return organizationUnit.MapTo<OrganizationUnitDto>();
        }

        public async Task<OrganizationUnitDto> UpdateOrganizationUnit(UpdateOrganizationUnitInput input)
        {
            var organizationUnit = await _organizationUnitRepository.GetAsync(input.Id);

            organizationUnit.DisplayName = input.DisplayName;

            await _organizationUnitManager.UpdateAsync(organizationUnit);

            return organizationUnit.MapTo<OrganizationUnitDto>();
        }

        public async Task DeleteOrganizationUnit(long id)
        {
            if (await IsOrganizationInUse(id))
            {
                throw new UserFriendlyException(L("Err_OrganizationInUse"));
            }
            await _organizationUnitManager.DeleteAsync(id);
        }

        protected async Task<bool> IsOrganizationInUse(long id)
        {
            return await _userRepository.CountAsync(d => d.Organization == id) > 0;
        }
    }
}
