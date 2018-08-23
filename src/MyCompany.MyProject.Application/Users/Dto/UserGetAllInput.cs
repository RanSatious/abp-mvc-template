using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;

namespace MyCompany.MyProject.Users.Dto
{
    public class UserGetAllInput : PagedAndSortedResultRequestDto
    {
        public string UserName { get; set; }

        public string Name { get; set; }

        public int? Organization { get; set; }
    }
}
