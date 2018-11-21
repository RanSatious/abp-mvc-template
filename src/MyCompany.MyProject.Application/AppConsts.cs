namespace MyCompany.MyProject
{
    /// <summary>
    /// Some consts used in the application.
    /// </summary>
    public class AppConsts
    {
        /// <summary>
        /// Default page size for paged requests.
        /// </summary>
        public const int DefaultPageSize = 10;

        /// <summary>
        /// Maximum allowed page size for paged requests.
        /// </summary>
        public const int MaxPageSize = 1000;

        public const string DefaultUploadPath = "/Upload";
        public const int MaxAttachSize = 1024 * 1024 * 2;
    }
}
