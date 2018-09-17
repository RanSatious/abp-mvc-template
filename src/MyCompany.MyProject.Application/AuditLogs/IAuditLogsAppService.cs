using Abp.Application.Services;
using Abp.Application.Services.Dto;
using MyCompany.MyProject.AuditLogs.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyCompany.MyProject.AuditLogs
{
    public interface IAuditLogsAppService : IApplicationService
    {
        Task<PagedResultDto<AuditLogsDto>> Get(GetAuditLogInput input);
    }
}
