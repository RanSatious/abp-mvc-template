using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyCompany.MyProject.Dictionarys.Dto
{
    public class DictionaryGroupDto
    {
        public string Name { get; set; }

        public string DisplayName { get; set; }

        public List<DictionaryItemDto> Items { get; set; }
    }
}
