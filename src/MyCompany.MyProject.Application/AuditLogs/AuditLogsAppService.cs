using Abp.Application.Services.Dto;
using Abp.Auditing;
using Abp.Authorization;
using Abp.AutoMapper;
using Abp.Domain.Repositories;
using Abp.Linq.Extensions;
using MyCompany.MyProject.AuditLogs.Dto;
using MyCompany.MyProject.Authorization;
using MyCompany.MyProject.Authorization.Users;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyCompany.MyProject.AuditLogs
{
    [AbpAuthorize(PermissionNames.Pages_Administration_AuditLogs)]
    public class AuditLogsAppService : MyProjectAppServiceBase, IAuditLogsAppService
    {
        private readonly IRepository<User, long> _userRepository;
        private readonly IRepository<AuditLog, long> _auditLogRepository;

        public AuditLogsAppService(IRepository<User, long> userRepository,IRepository<AuditLog, long> auditLogRepository)
        {
            _userRepository=userRepository;
            _auditLogRepository= auditLogRepository;
        }
        public async Task<PagedResultDto<AuditLogsDto>> Get(GetAuditLogInput input) {
            var query = from user in _userRepository.GetAll()
                        where (string.IsNullOrEmpty(input.UserName) ? true : user.Name == input.UserName)
                        join logs in _auditLogRepository.GetAll()
                        on user.Id equals logs.UserId
                        where logs.UserId != null
                        orderby logs.ExecutionTime descending
                        select new { user.Name, logs };
            var totalCount = await query.CountAsync();
            var items = await query.PageBy(input).ToListAsync();
            var result = new PagedResultDto<AuditLogsDto>(
                totalCount,
                items.Select(item => {
                    var dto = item.logs.MapTo<AuditLogsDto>();
                    dto.UserName = item.Name;
                    return dto;
                }).ToList());
            return result;
        }
    }
}
