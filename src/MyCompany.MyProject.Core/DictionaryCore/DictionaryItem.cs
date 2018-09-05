using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyCompany.MyProject.DictionaryCore
{
    [Table("DictionaryItem")]
    public class DictionaryItem : FullAuditedEntity<long>, IMayHaveTenant
    {
        public const int NameMaxLength = 100;
        public const int InfoMaxLength = 255;

        public virtual int? TenantId { get; set; }

        public long Type { get; set; }

        [Required]
        [MaxLength(NameMaxLength)]
        public string Name { get; set; }

        [Required]
        public int Order { get; set; }

        [MaxLength(InfoMaxLength)]
        public string Info { get; set; }

        [Required]
        public int Value { get; set; }

        public virtual DictionaryType DictionaryType { get; set; }
    }
}
