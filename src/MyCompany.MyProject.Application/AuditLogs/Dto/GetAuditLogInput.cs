using Abp.Runtime.Validation;
using MyCompany.MyProject.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyCompany.MyProject.AuditLogs.Dto
{
    public class GetAuditLogInput : PagedAndSortedInputDto, IShouldNormalize
    {
        public string UserName { get; set; }
        public void Normalize()
        {
            if (string.IsNullOrEmpty(Sorting))
            {
                Sorting = "ExecutionTime,UserName";
            }
        }
    }
}
