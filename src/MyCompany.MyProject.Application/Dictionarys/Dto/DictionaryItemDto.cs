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
    [AutoMap(typeof(DictionaryItem))]
    public class DictionaryItemDto : EntityDto<long>
    {
        [Required]
        [Range(0, Int32.MaxValue)]
        public long Type { get; set; }

        [Required]
        [MaxLength(DictionaryItem.NameMaxLength)]
        public string Name { get; set; }

        [Required]
        public int Order { get; set; }

        [MaxLength(DictionaryItem.InfoMaxLength)]
        public string Info { get; set; }

        [Required]
        public int Value { get; set; }

        public string TypeName { get; set; }
    }
}
