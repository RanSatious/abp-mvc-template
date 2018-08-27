namespace Ideayapai.Bridge.Health.Dto
{
    public class EntityNullableDto<T> where T : struct
    {
        public T? Id { get; set; }
    }

    public class EntityNullableDto : EntityNullableDto<int>
    {

    }
}
