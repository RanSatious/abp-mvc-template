using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.AutoMapper;
using Abp.Domain.Repositories;
using Abp.UI;
using MyCompany.MyProject.Authorization;
using MyCompany.MyProject.DictionaryCore;
using MyCompany.MyProject.Dictionarys.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyCompany.MyProject.Dictionarys
{
    [AbpAuthorize]
    public class DictionaryTypeAppService : MyProjectAsyncCurdAppServiceBase<DictionaryType, DictionaryTypeDto, long, PagedResultRequestDto, DictionaryTypeInput, DictionaryTypeDto>, IDictionaryTypeAppService
    {
        public DictionaryTypeAppService(IRepository<DictionaryType, long> repository) : base(repository)
        {
            CreatePermissionName = PermissionNames.Pages_Administration_Dictionary;
            UpdatePermissionName = PermissionNames.Pages_Administration_Dictionary;
            DeletePermissionName = PermissionNames.Pages_Administration_Dictionary;
        }

        public override Task<DictionaryTypeDto> Create(DictionaryTypeInput input)
        {
            // check name
            var nameCount = Repository.Count(t => t.Name == input.Name.Trim());
            if (nameCount > 0)
            {
                throw new UserFriendlyException(L("Err_Name_In_Use"));
            }
            return base.Create(input);
        }

        public override Task<PagedResultDto<DictionaryTypeDto>> GetAll(PagedResultRequestDto input)
        {
            var totalcount = Repository.Count();
            var result = Repository.GetAll().OrderByDescending(c => c.DisplayName.Length).MapTo<List<DictionaryTypeDto>>();

            return Task.FromResult( new PagedResultDto<DictionaryTypeDto>(totalcount,result));
        }

        public override Task Delete(EntityDto<long> input)
        {
            var type = Repository.Get(input.Id);
            if (type.Items.Count > 0)
            {
                throw new UserFriendlyException(L("Err_Type_In_Use"));
            }
            return base.Delete(input);
        }

        public async Task<DictionaryTypeDto> GetByName(string name)
        {
            var type = await Repository.FirstOrDefaultAsync(t => t.Name == name);
            if (type == null)
            {
                throw new UserFriendlyException(L("Err_Type_Not_Found"));
            }
            return MapToEntityDto(type);
        }
    }
}
