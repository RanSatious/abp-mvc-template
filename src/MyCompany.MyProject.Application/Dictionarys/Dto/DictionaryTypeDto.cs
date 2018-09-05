using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using MyCompany.MyProject.DictionaryCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyCompany.MyProject.Dictionarys.Dto
{
    [AutoMap(typeof(DictionaryType))]
    public class DictionaryTypeDto : EntityDto<long>
    {
        [Required]
        [MaxLength(DictionaryType.NameMaxLength)]
        public string Name { get; set; }

        [MaxLength(DictionaryType.NameMaxLength)]
        public string DisplayName { get; set; }
    }
}
