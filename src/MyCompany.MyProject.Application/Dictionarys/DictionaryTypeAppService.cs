using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.AutoMapper;
using Abp.Domain.Repositories;
using Abp.UI;
using MyCompany.MyProject.Authorization;
using MyCompany.MyProject.Dictionary;
using MyCompany.MyProject.Dictionarys.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Application.Services;

namespace MyCompany.MyProject.Dictionarys
{
    [AbpAuthorize(PermissionNames.Pages_Administration_Dictionary)]
    public class DictionaryTypeAppService : AsyncCrudAppService<DictionaryType, DictionaryTypeDto, long, PagedResultRequestDto, DictionaryTypeInput, DictionaryTypeDto>, IDictionaryTypeAppService
    {
        public DictionaryTypeAppService(IRepository<DictionaryType, long> repository) : base(repository)
        {
            LocalizationSourceName = MyProjectConsts.LocalizationSourceName;
        }

        public override async Task<DictionaryTypeDto> Create(DictionaryTypeInput input)
        {
            // check name
            var nameCount = Repository.Count(t => t.Name == input.Name.Trim());
            if (nameCount > 0)
            {
                throw new UserFriendlyException(L("Err_Name_In_Use"));
            }
            return await base.Create(input);
        }

        public override async Task<DictionaryTypeDto> Update(DictionaryTypeDto input)
        {
            CheckUpdatePermission();
            var entity = await GetEntityByIdAsync(input.Id);
            entity.DisplayName = input.DisplayName;
            await CurrentUnitOfWork.SaveChangesAsync();
            return MapToEntityDto(entity);
        }

        public override async Task Delete(EntityDto<long> input)
        {
            var type = await Repository.GetAsync(input.Id);
            if (type.Items.Count > 0)
            {
                throw new UserFriendlyException(L("Err_Type_In_Use"));
            }

            await base.Delete(input);
        }

        public async Task<DictionaryTypeDto> GetByName(string name)
        {
            var type = await Repository.FirstOrDefaultAsync(t => t.Name == name.Trim());
            if (type == null)
            {
                throw new UserFriendlyException(L("Err_Type_Not_Found"));
            }
            return MapToEntityDto(type);
        }
    }
}
