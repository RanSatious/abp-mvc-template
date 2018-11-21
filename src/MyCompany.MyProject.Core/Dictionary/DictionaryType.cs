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
    [Table("DictionaryType")]
    public class DictionaryType : FullAuditedEntity<long>, IMayHaveTenant
    {
        public const int NameMaxLength = 100;

        public DictionaryType()
        {
            Items = new List<DictionaryItem>();
        }

        public virtual int? TenantId { get; set; }

        [Required]
        [MaxLength(NameMaxLength)]
        public string Name { get; set; }

        [MaxLength(NameMaxLength)]
        public string DisplayName { get; set; }


        public virtual ICollection<DictionaryItem> Items { get; set; }
    }
}
