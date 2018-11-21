using Abp.Application.Services;
using Abp.Application.Services.Dto;
using MyCompany.MyProject.Dto;
using MyCompany.MyProject.Dictionarys.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyCompany.MyProject.Dictionarys
{
    public interface IDictionaryAppService : IAsyncCrudAppService<DictionaryItemDto, long, PagedSortedAndFilteredInputDto, CreateDictionaryItemInput, DictionaryItemDto>
    {
        Task<ListResultDto<DictionaryItemDto>> GetAllByTypeName(string name);
        Task<ListResultDto<DictionaryItemDto>> GetByTypeName(string name);
        Task<List<DictionaryGroupDto>> GetDictionarys(List<string> names);
    }
}
