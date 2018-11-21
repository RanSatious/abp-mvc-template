using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyCompany.MyProject.Dictionary
{
    [Table("DictionaryItem")]
    public class DictionaryItem : FullAuditedEntity<long>, IMayHaveTenant
    {
        public const int NameMaxLength = 100;
        public const int InfoMaxLength = 255;

        public virtual int? TenantId { get; set; }

        [Required, ForeignKey("DictionaryType")]
        public long TypeId { get; set; }

        [Required]
        [MaxLength(NameMaxLength)]
        public string Name { get; set; }


        [MaxLength(InfoMaxLength)]
        public string Info { get; set; }

        public virtual DictionaryType DictionaryType { get; set; }
    }
}
