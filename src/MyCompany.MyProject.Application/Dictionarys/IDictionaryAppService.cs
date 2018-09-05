using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Ideayapai.Bridge.Health.Dto;
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
        Task DeleteAll(long[] ids);

        Task OrderType(int typeId);

        Task<ListResultDto<DictionaryItemDto>> GetAllByTypeName(string name);
    }
}
