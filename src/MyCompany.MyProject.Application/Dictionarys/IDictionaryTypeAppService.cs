using Abp.Application.Services;
using Abp.Application.Services.Dto;
using MyCompany.MyProject.Dictionarys.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyCompany.MyProject.Dictionarys
{
    public interface IDictionaryTypeAppService : IAsyncCrudAppService<DictionaryTypeDto, long, PagedResultRequestDto, DictionaryTypeInput, DictionaryTypeDto>
    {
        Task<DictionaryTypeDto> GetByName(string name);
    }
}
