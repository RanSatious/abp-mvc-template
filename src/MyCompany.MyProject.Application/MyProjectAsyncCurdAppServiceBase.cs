using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Entities;
using Abp.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyCompany.MyProject
{
    public abstract class MyProjectAsyncCurdAppServiceBase<TEntity, TEntityDto, TPrimaryKey, TGetAllInput, TCreateInput, TUpdateInput> : MyProjectAsyncCurdAppServiceBase<TEntity, TEntityDto, TPrimaryKey, TGetAllInput, TCreateInput, TUpdateInput, EntityDto<TPrimaryKey>> where TEntity : class, IEntity<TPrimaryKey> where TEntityDto : IEntityDto<TPrimaryKey> where TUpdateInput : IEntityDto<TPrimaryKey>
    {
        protected MyProjectAsyncCurdAppServiceBase(IRepository<TEntity, TPrimaryKey> repository)
            : base(repository)
        {
        }
    }

    public abstract class MyProjectAsyncCurdAppServiceBase<TEntity, TEntityDto, TPrimaryKey, TGetAllInput, TCreateInput, TUpdateInput, TGetInput> : MyProjectAsyncCurdAppServiceBase<TEntity, TEntityDto, TPrimaryKey, TGetAllInput, TCreateInput, TUpdateInput, TGetInput, EntityDto<TPrimaryKey>> where TEntity : class, IEntity<TPrimaryKey> where TEntityDto : IEntityDto<TPrimaryKey> where TUpdateInput : IEntityDto<TPrimaryKey> where TGetInput : IEntityDto<TPrimaryKey>
    {
        protected MyProjectAsyncCurdAppServiceBase(IRepository<TEntity, TPrimaryKey> repository)
            : base(repository)
        {
        }
    }

    public abstract class MyProjectAsyncCurdAppServiceBase<TEntity, TEntityDto, TPrimaryKey, TGetAllInput, TCreateInput, TUpdateInput, TGetInput, TDeleteInput> : AsyncCrudAppService<TEntity, TEntityDto, TPrimaryKey, TGetAllInput, TCreateInput, TUpdateInput, TGetInput, TDeleteInput> where TEntity : class, IEntity<TPrimaryKey> where TEntityDto : IEntityDto<TPrimaryKey> where TUpdateInput : IEntityDto<TPrimaryKey> where TGetInput : IEntityDto<TPrimaryKey> where TDeleteInput : IEntityDto<TPrimaryKey>
    {
        protected MyProjectAsyncCurdAppServiceBase(IRepository<TEntity, TPrimaryKey> repository)
            : base(repository)
        {
            LocalizationSourceName = MyProjectConsts.LocalizationSourceName;
        }
    }
}
