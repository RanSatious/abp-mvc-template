using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Data.Entity;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Authorization.Users;
using Abp.AutoMapper;
using Abp.Domain.Repositories;
using Abp.IdentityFramework;
using Abp.Linq.Extensions;
using MyCompany.MyProject.Authorization;
using MyCompany.MyProject.Authorization.Roles;
using MyCompany.MyProject.Authorization.Users;
using MyCompany.MyProject.Roles.Dto;
using MyCompany.MyProject.Users.Dto;
using Microsoft.AspNet.Identity;
using Abp.Organizations;

namespace MyCompany.MyProject.Users
{
    [AbpAuthorize(PermissionNames.Pages_Administration_Users)]
    public class UserAppService : AsyncCrudAppService<User, UserDto, long, UserGetAllInput, CreateUserDto, UpdateUserDto>, IUserAppService
    {
        private readonly UserManager _userManager;
        private readonly RoleManager _roleManager;
        private readonly IRepository<Role> _roleRepository;
        private readonly IRepository<UserRole, long> _userRoleRepository;
        private readonly IRepository<OrganizationUnit, long> _organizationUnitRepository;

        public UserAppService(
            IRepository<User, long> repository, 
            UserManager userManager, 
            IRepository<Role> roleRepository, 
            RoleManager roleManager,
            IRepository<UserRole, long> userRoleRepository,
            IRepository<OrganizationUnit, long> organizationUnitRepository)
            : base(repository)
        {
            _userManager = userManager;
            _roleRepository = roleRepository;
            _roleManager = roleManager;

            _userRoleRepository = userRoleRepository;
            _organizationUnitRepository = organizationUnitRepository;
        }

        public override async Task<PagedResultDto<UserDto>> GetAll(UserGetAllInput input)
        {
            var queryRole = from ur in _userRoleRepository.GetAll()
                            join role in _roleRepository.GetAll() on ur.RoleId equals role.Id
                            select new { ur, role.Name, role.DisplayName, role.Id };

            var query = from user in CreateFilteredQuery(input)
                join org in _organizationUnitRepository.GetAll() on user.Organization equals org.Id into orgs
                from defaultOrg in orgs.DefaultIfEmpty()
                join ur in queryRole on user.Id equals ur.ur.UserId into urs
                from defaultUr in urs.DefaultIfEmpty()
                select new {user, role = defaultUr, organization = defaultOrg} into users
                group users by users.user into g
                select new {User = g.Key, Roles = g.Select(u => u.role == null ? null : new {u.role.Id, u.role.Name, u.role.DisplayName}), Organization = g.Select(u => u.organization).FirstOrDefault()};

            var totalCount = await query.CountAsync();
            var items = await query.OrderBy(d => d.User.Id).PageBy(input).ToListAsync();

            return new PagedResultDto<UserDto>(
                totalCount,
                items.Select(item =>
                {
                    var dto = item.User.MapTo<UserDto>();
                    dto.Roles = item.Roles.Any(d => d != null) ? item.Roles.Select(d => new string[] { d.Id.ToString(), d.Name, d.DisplayName }).ToList() : new List<string[]>();
                    dto.OrganizationName = item.Organization?.DisplayName;
                    return dto;
                }).ToList());
        }

        public override async Task<UserDto> Get(EntityDto<long> input)
        {
            var user = await base.Get(input);
            var userRoles = await _userManager.GetRolesAsync(user.Id);
            user.Roles = new List<string[]>();
            return user;
        }

        public override async Task<UserDto> Create(CreateUserDto input)
        {
            CheckCreatePermission();

            var user = ObjectMapper.Map<User>(input);

            user.TenantId = AbpSession.TenantId;
            user.Password = new PasswordHasher().HashPassword(input.Password);
            user.IsEmailConfirmed = true;

            //Assign roles
            user.Roles = new Collection<UserRole>();
            foreach (var roleName in input.RoleNames)
            {
                var role = await _roleManager.GetRoleByNameAsync(roleName);
                user.Roles.Add(new UserRole(AbpSession.TenantId, user.Id, role.Id));
            }

            CheckErrors(await _userManager.CreateAsync(user));

            await CurrentUnitOfWork.SaveChangesAsync();

            return MapToEntityDto(user);
        }

        public override async Task<UserDto> Update(UpdateUserDto input)
        {
            CheckUpdatePermission();

            var user = await _userManager.GetUserByIdAsync(input.Id);

            MapToEntity(input, user);

            CheckErrors(await _userManager.UpdateAsync(user));

            if (input.RoleNames != null)
            {
                CheckErrors(await _userManager.SetRoles(user, input.RoleNames));
            }

            return await Get(input);
        }

        public override async Task Delete(EntityDto<long> input)
        {
            var user = await _userManager.GetUserByIdAsync(input.Id);
            await _userManager.DeleteAsync(user);
        }

        public async Task<ListResultDto<RoleDto>> GetRoles()
        {
            var roles = await _roleRepository.GetAllListAsync();
            return new ListResultDto<RoleDto>(ObjectMapper.Map<List<RoleDto>>(roles));
        }

        protected override User MapToEntity(CreateUserDto createInput)
        {
            var user = ObjectMapper.Map<User>(createInput);
            return user;
        }

        protected override void MapToEntity(UpdateUserDto input, User user)
        {
            ObjectMapper.Map(input, user);
        }

        protected override IQueryable<User> CreateFilteredQuery(UserGetAllInput input)
        {
            return Repository.GetAllIncluding(x => x.Roles);
        }

        protected override async Task<User> GetEntityByIdAsync(long id)
        {
            var user = Repository.GetAllIncluding(x => x.Roles).FirstOrDefault(x => x.Id == id);
            return await Task.FromResult(user);
        }

        protected override IQueryable<User> ApplySorting(IQueryable<User> query, UserGetAllInput input)
        {
            return query.OrderBy(input.Sorting);
        }

        protected virtual void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}