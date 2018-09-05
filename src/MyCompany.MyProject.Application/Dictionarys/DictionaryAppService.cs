using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.Domain.Repositories;
using Abp.Extensions;
using Abp.Linq.Extensions;
using Ideayapai.Bridge.Health.Dto;
using MyCompany.MyProject.Authorization;
using MyCompany.MyProject.DictionaryCore;
using MyCompany.MyProject.Dictionarys.Dto;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyCompany.MyProject.Dictionarys
{
    public class DictionaryAppService : AsyncCrudAppService<DictionaryItem, DictionaryItemDto, long, PagedSortedAndFilteredInputDto, CreateDictionaryItemInput, DictionaryItemDto>, IDictionaryAppService
    {
        public DictionaryAppService(IRepository<DictionaryItem, long> repository) : base(repository)
        {
            CreatePermissionName = PermissionNames.Pages_Administration_Dictionary_Create;
            UpdatePermissionName = PermissionNames.Pages_Administration_Dictionary_Edit;
            DeletePermissionName = PermissionNames.Pages_Administration_Dictionary_Delete;
        }

        protected override IQueryable<DictionaryItem> CreateFilteredQuery(PagedSortedAndFilteredInputDto input)
        {
            return Repository.GetAllIncluding(item => item.DictionaryType)
                .WhereIf(!input.Filter.IsNullOrWhiteSpace(), m => m.Type.ToString() == input.Filter);
        }

        public override Task<PagedResultDto<DictionaryItemDto>> GetAll(PagedSortedAndFilteredInputDto input)
        {
            long filter=1;
            if (!string.IsNullOrEmpty(input.Filter))
                filter = long.Parse(input.Filter);
            var result = Repository.GetAll().WhereIf(!string.IsNullOrEmpty(input.Filter),c=>c.Type==filter).MapTo<List<DictionaryItemDto>>();
            var totalcount = result.Count;
            return Task.FromResult(new PagedResultDto<DictionaryItemDto>(totalcount, result));
            //input.Sorting = "Order ASC";
            //return base.GetAll(input);
        }

        public override async Task<DictionaryItemDto> Create(CreateDictionaryItemInput input)
        {
            // generate value automatically
            var query = Repository.GetAll().Where(t => t.Type == input.Type);
            var count = await query.CountAsync();
            input.Value = count > 0 ? await query.MaxAsync(t => t.Value) + 1 : 1;
            return await base.Create(input);
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

        public async Task OrderType(int typeId)
        {
            throw new NotImplementedException();
        }
    }
}
