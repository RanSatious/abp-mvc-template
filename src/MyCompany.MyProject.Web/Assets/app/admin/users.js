define(['main', 'app/admin/userModal', 'lib/table', 'lay!form'], function(main, userModal) {
  var $ = layui.$;
  var table = layui.table;
  var form = layui.form;

  var userService = abp.services.app.user;

  var roleService = abp.services.app.role;
  var roles = [];
  roleService.getAll({ maxResultCount: 9999 }).then(function(result) {
    roles = result.items;
  });

  var organizationService = abp.services.app.organizationUnit;
  var organizations = [];
  organizationService.getOrganizationUnits({}).then(function(result) {
    organizations = result.items.map(function(item) {
      return {
        id: item.id,
        code: item.code,
        text: renderOrganizationText(item)
      };
    });
  });

  var renderOrganizationText = function(item) {
    var iDepth = item.code.split('.').length - 1;
    var text = item.displayName;
    while (iDepth > 0) {
      text = '　' + text;
      iDepth--;
    }
    return text;
  };

  table.render({
    elem: '#main-table',
    cellMinWidth: 80,
    url: '/api/services/app/user/GetAll',
    cols: [
      [
        { type: 'numbers' },
        { type: 'checkbox' },
        { field: 'userName', title: '登录名' },
        { field: 'name', title: '用户名' },
        { field: 'organizationName', title: '部门' },
        { field: 'roles', title: '角色', templet: '#roleTpl' },
        { field: 'action', title: '操作', width: 120, toolbar: '#actionTpl', align: 'center', unresize: true }
      ]
    ]
  });

  //监听工具条
  table.on('tool(user)', function(obj) {
    var data = obj.data;
    if (obj.event == 'edit') {
      userModal.edit({
        model: data,
        roles: roles,
        organizations: organizations,
        callback: function() {
          table.reload('main-table');
        }
      });
    } else if (obj.event === 'delete') {
      abp.message.confirm('是否删除？').then(function(result) {
        if (!result) return;
        userService.delete({ id: data.id }).then(function() {
          table.reload('main-table');
        });
      });
    }
  });

  form.on('submit', function(data) {
    return false;
  });

  form.on('submit(search)', function(data) {
    table.reload('main-table', {
      where: data.field
    });
    return false;
  });

  $('#btn-add').click(function() {
    userModal.create({
      roles: roles,
      organizations: organizations,
      callback: function() {
        table.reload('main-table');
      }
    });
  });
});
