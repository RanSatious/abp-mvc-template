using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using MyCompany.MyProject.Dictionary;
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
        public long TypeId { get; set; }

        [Required]
        [MaxLength(DictionaryItem.NameMaxLength)]
        public string Name { get; set; }

        [MaxLength(DictionaryItem.InfoMaxLength)]
        public string Info { get; set; }

        public DictionaryTypeDto DictionaryType { get; set; }
    }
}
