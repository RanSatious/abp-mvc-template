using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Microsoft.AspNet.Identity;
using MyCompany.MyProject.Roles.Dto;
using MyCompany.MyProject.Users.Dto;

namespace MyCompany.MyProject.Users
{
    public interface IUserAppService : IAsyncCrudAppService<UserDto, long, UserGetAllInput, CreateUserDto, UpdateUserDto>
    {
        Task<ListResultDto<RoleDto>> GetRoles();
        Task<IdentityResult> ChangePassword(ChangePasswordDto input);
        Task<ListResultDto<UserDto>> GetPersonalInfo();
        Task<IdentityResult> UpdatePrsonalInfo(UpdatePrsonalInfoDto input);
    }
}