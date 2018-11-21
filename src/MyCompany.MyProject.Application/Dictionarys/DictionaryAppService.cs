using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.Domain.Repositories;
using Abp.Extensions;
using Abp.Linq.Extensions;
using MyCompany.MyProject.Dto;
using MyCompany.MyProject.Authorization;
using MyCompany.MyProject.Dictionary;
using MyCompany.MyProject.Dictionarys.Dto;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.UI;

namespace MyCompany.MyProject.Dictionarys
{
    public class DictionaryAppService : AsyncCrudAppService<DictionaryItem, DictionaryItemDto, long, PagedSortedAndFilteredInputDto, CreateDictionaryItemInput, DictionaryItemDto>, IDictionaryAppService
    {
        private readonly IRepository<DictionaryType, long> _dictionaryTypeRepository;
        public DictionaryAppService(
            IRepository<DictionaryItem, long> repository,
            IRepository<DictionaryType, long> dictionaryTypeRepository) : base(repository)
        {
            _dictionaryTypeRepository = dictionaryTypeRepository;
        }

        protected override IQueryable<DictionaryItem> CreateFilteredQuery(PagedSortedAndFilteredInputDto input)
        {
            return Repository.GetAllIncluding(item => item.DictionaryType)
                .WhereIf(!input.Filter.IsNullOrWhiteSpace(), m => m.TypeId.ToString() == input.Filter);
        }

        public async Task<ListResultDto<DictionaryItemDto>> GetAllByTypeName(string name)
        {
            var items = Repository.GetAllIncluding(item => item.DictionaryType)
                .WhereIf(!string.IsNullOrWhiteSpace(name), item => item.DictionaryType.Name == name);

            return await Task.FromResult(new ListResultDto<DictionaryItemDto>(ObjectMapper.Map<List<DictionaryItemDto>>(items)));
        }

        public async Task DeleteAll(long[] ids)
        {
            foreach (long id in ids)
            {
                await Delete(new EntityDto<long>(id));
            }
        }
        public async Task<ListResultDto<DictionaryItemDto>> GetByTypeName(string name)
        {
            var query = from dictionaryType in _dictionaryTypeRepository.GetAll()
                        where dictionaryType.Name == name
                        join dictionaryItem in Repository.GetAll() on dictionaryType.Id equals dictionaryItem.TypeId
                        select new { dictionaryItem };
            var items = await query.OrderBy(d => d.dictionaryItem.Id).ToListAsync();
            var result = new ListResultDto<DictionaryItemDto>(
                items.Select(item => {
                    var dto = item.dictionaryItem.MapTo<DictionaryItemDto>();
                    return dto;
                }).ToList());
            return result;
        }

        public async Task<List<DictionaryGroupDto>> GetDictionarys(List<string> names)
        {
            var list = new List<DictionaryGroupDto>();
            foreach (var name in names)
            {
                var type = await _dictionaryTypeRepository.FirstOrDefaultAsync(t => t.Name == name);
                if (type == null)
                {
                    throw new UserFriendlyException("Err_Type_Not_Found");
                }
                list.Add(new DictionaryGroupDto() { Name = name, DisplayName = type.DisplayName, Items = (await GetAllByTypeName(name)).Items.ToList() });
            }
            return list;
        }
    }
}
