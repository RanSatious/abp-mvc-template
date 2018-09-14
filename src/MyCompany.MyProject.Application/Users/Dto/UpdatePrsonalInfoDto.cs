﻿using Abp.Application.Services.Dto;
using Abp.Authorization.Users;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyCompany.MyProject.Users.Dto
{
    public class UpdatePrsonalInfoDto : EntityDto<long>
    {

        [Required]
        [StringLength(AbpUserBase.MaxNameLength)]
        public string Name { get; set; }

        [Required]
        [EmailAddress]
        [StringLength(AbpUserBase.MaxEmailAddressLength)]
        public string EmailAddress { get; set; }

        public bool IsActive { get; set; }

        public DateTime? LastLoginTime { get; set; }

        public DateTime CreationTime { get; set; }
    }
}
