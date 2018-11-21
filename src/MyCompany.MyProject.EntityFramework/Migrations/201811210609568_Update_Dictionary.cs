namespace MyCompany.MyProject.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Update_Dictionary : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.DictionaryItem", "DictionaryType_Id", "dbo.DictionaryType");
            DropIndex("dbo.DictionaryItem", new[] { "DictionaryType_Id" });
            RenameColumn(table: "dbo.DictionaryItem", name: "DictionaryType_Id", newName: "TypeId");
            AlterColumn("dbo.DictionaryItem", "TypeId", c => c.Long(nullable: false));
            CreateIndex("dbo.DictionaryItem", "TypeId");
            AddForeignKey("dbo.DictionaryItem", "TypeId", "dbo.DictionaryType", "Id", cascadeDelete: true);
            DropColumn("dbo.DictionaryItem", "Type");
            DropColumn("dbo.DictionaryItem", "Order");
            DropColumn("dbo.DictionaryItem", "Value");
        }
        
        public override void Down()
        {
            AddColumn("dbo.DictionaryItem", "Value", c => c.Int(nullable: false));
            AddColumn("dbo.DictionaryItem", "Order", c => c.Int(nullable: false));
            AddColumn("dbo.DictionaryItem", "Type", c => c.Long(nullable: false));
            DropForeignKey("dbo.DictionaryItem", "TypeId", "dbo.DictionaryType");
            DropIndex("dbo.DictionaryItem", new[] { "TypeId" });
            AlterColumn("dbo.DictionaryItem", "TypeId", c => c.Long());
            RenameColumn(table: "dbo.DictionaryItem", name: "TypeId", newName: "DictionaryType_Id");
            CreateIndex("dbo.DictionaryItem", "DictionaryType_Id");
            AddForeignKey("dbo.DictionaryItem", "DictionaryType_Id", "dbo.DictionaryType", "Id");
        }
    }
}
