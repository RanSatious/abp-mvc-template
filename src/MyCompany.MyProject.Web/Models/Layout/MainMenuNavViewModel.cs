using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Abp.Application.Navigation;

namespace MyCompany.MyProject.Web.Models.Layout
{
    public class MainMenuNavViewModel
    {
        public UserMenu MainMenu { get; set; }

        public string ActiveMenuItemName { get; set; }

        public bool IsLeft { get; set; }
    }
}