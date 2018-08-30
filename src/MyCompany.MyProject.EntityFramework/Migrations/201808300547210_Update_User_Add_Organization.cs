namespace MyCompany.MyProject.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Update_User_Add_Organization : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.AbpUsers", "Organization", c => c.Long());
        }
        
        public override void Down()
        {
            DropColumn("dbo.AbpUsers", "Organization");
        }
    }
}
