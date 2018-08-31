﻿using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using MyCompany.MyProject.Roles.Dto;

namespace MyCompany.MyProject.Roles
{
    public interface IRoleAppService : IAsyncCrudAppService<RoleDto, int, PagedAndSortedResultRequestDto, CreateRoleDto, RoleDto>
    {
        Task<ListResultDto<PermissionDto>> GetAllPermissions();
    }
}
