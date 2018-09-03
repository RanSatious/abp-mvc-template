using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Configuration;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace MyCompany.MyProject.Generator
{
    public partial class Form1 : Form
    {
        private string _srcPath;
        private string _targetPath;
        private string _defaultSln;
        private string _defaultProject;
        private string _targetSln;
        private string _targetProject;
        private List<string> _ignorePaths;
        private List<string> _ignoreFiles;
        private List<string> _skipFiles;

        private List<string> _handledPaths;
        private List<string> _handledFiles;

        public Form1()
        {
            InitializeComponent();

            btnOK.Enabled = false;

            _srcPath = ConfigurationManager.AppSettings["SrcPath"];
            txtSrcPath.Text = _srcPath;

            _defaultSln = ConfigurationManager.AppSettings["DefaultSln"];
            _defaultProject = _defaultSln.Split('.').Last();
            _ignorePaths = ConfigurationManager.AppSettings["IgnorePaths"].Split('|').ToList();
            _ignoreFiles = ConfigurationManager.AppSettings["IgnoreFiles"].Split('|').ToList();
            _skipFiles = ConfigurationManager.AppSettings["SkipFiles"].Split('|').ToList();

            _handledPaths = new List<string>();
            _handledFiles = new List<string>();
        }
        private void btnPath_Click(object sender, EventArgs e)
        {
            var result = folderBrowserDialog1.ShowDialog();
            if (result == DialogResult.OK)
            {
                txtPath.Text = folderBrowserDialog1.SelectedPath;
            }
        }

        private void btnSrcPath_Click(object sender, EventArgs e)
        {
            var result = folderBrowserDialog1.ShowDialog();
            if (result == DialogResult.OK)
            {
                txtSrcPath.Text = folderBrowserDialog1.SelectedPath;
            }
        }

        private void btnOK_Click(object sender, EventArgs e)
        {
            // check path
            if (!this.checkPath())
            {
                return;
            }
            this._srcPath = txtSrcPath.Text.Trim();
            this._targetPath = txtPath.Text.Trim();
            // check name
            if (!this.checkName())
            {
                return;
            }
            this._targetSln = txtName.Text.Trim();
            this._targetProject = this._targetSln.Split('.').Last();

            this.process();
        }

        private  void process()
        {
            try
            {
                // copy and replace
                this.copyFiles(this._srcPath);
                MessageBox.Show("完成");
            }
            catch (Exception e)
            {
                this.processFail();
                Console.WriteLine(e);
                MessageBox.Show($"生成失败，{e.Message}");
                throw;
            }
        }

        private void processFail()
        {
            try
            {
                foreach (var file in _handledFiles)
                {
                    File.Delete(file);
                }
                foreach (var path in _handledPaths)
                {
                    if (Directory.Exists(path))
                    {
                        Directory.Delete(path);
                    }
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }

        }

        private void copyFiles(string path)
        {
            var files = Directory.GetFiles(path);
            foreach (var file in files)
            {
                // todo: log
                Console.WriteLine($"copy file {file}");

                // todo: check file
                if (_ignoreFiles.IndexOf(file.Substring(file.LastIndexOf(".") + 1)) >= 0)
                {
                    continue;
                }

                var newFile = file.Replace(this._srcPath, this._targetPath).Replace(_defaultSln, _targetSln)
                    .Replace(_defaultProject, _targetProject);
                if (_skipFiles.IndexOf(file.Substring(file.LastIndexOf(".") + 1)) >= 0)
                {
                    File.Copy(file, newFile);
                }
                else
                {
                    var content = File.ReadAllText(file).Replace(_defaultSln, _targetSln).Replace(_defaultProject, _targetProject);
                    File.WriteAllText(newFile, content);
                }
                _handledFiles.Add(newFile);
            }

            var subPaths = Directory.GetDirectories(path);
            foreach (var subPath in subPaths)
            {
                // todo: log
                Console.WriteLine($"copy path {subPath}");

                var lastPath = subPath.ToLower().Substring(subPath.LastIndexOf("\\") + 1);
                if (_ignorePaths.IndexOf(lastPath) >= 0)
                {
                    continue;
                }

                // check path
                var targetSubPath = subPath.Replace(this._srcPath, this._targetPath).Replace(_defaultSln, _targetSln).Replace(_defaultProject, _targetProject);
                if (!Directory.Exists(targetSubPath))
                {
                    Directory.CreateDirectory(targetSubPath);
                }
                _handledPaths.Add(targetSubPath);
                this.copyFiles(subPath);
            }
        }

        private bool checkPath()
        {
            try
            {
                var path = txtSrcPath.Text.Trim();
                if (!Directory.Exists(path))
                {
                    MessageBox.Show("Source Path不存在，请指定");
                    btnSrcPath.Focus();
                    return false;
                }

                path = txtPath.Text.Trim();
                if (!Directory.Exists(path))
                {
                    var result = MessageBox.Show("Target Path不存在，是否创建", "确认", MessageBoxButtons.OKCancel);
                    if (result != DialogResult.OK)
                    {
                        return false;
                    }
                    Directory.CreateDirectory(path);
                }
                return true;
            }
            catch (Exception e)
            {
                // todo: log error
                MessageBox.Show($"创建目录失败, {e.Message}");
                return false;
            }
        }

        private bool checkName()
        {
            var name = txtName.Text.Trim();
            var reg = new Regex("^[a-zA-Z]([a-zA-Z_.]*[a-zA-Z]|[a-zA-Z]*)$");
            if (!reg.IsMatch(name))
            {
                MessageBox.Show("工程只能包含字母、'.'，且不能以'.'开头和结尾");
            }
            return true;
        }

        private void txtPath_TextChanged(object sender, EventArgs e)
        {
            btnOK.Enabled = this.isOk();
        }

        private void txtName_TextChanged(object sender, EventArgs e)
        {
            btnOK.Enabled = this.isOk();
        }

        private void txtSrcPath_TextChanged(object sender, EventArgs e)
        {
            btnOK.Enabled = this.isOk();
        }

        private bool isOk()
        {
            return !string.IsNullOrEmpty(txtPath.Text.Trim()) && !string.IsNullOrEmpty(txtName.Text.Trim()) && !string.IsNullOrEmpty(txtSrcPath.Text.Trim());
        }
    }
}
