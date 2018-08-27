define(['main', 'app/admin/userModal', 'lay!table', 'lay!form'], function(main, userModal) {
  var $ = layui.$;
  var table = layui.table;
  var form = layui.form;

  var userService = abp.services.app.user;

  var roleService = abp.services.app.role;
  var roles = [];
  roleService.getAll({ maxResultCount: 99 }).then(function(result) {
    console.log(result);
    roles = result.items;
  });

  table.render({
    elem: '#main-table',
    cellMinWidth: 80,
    url: '/api/services/app/user/GetAll',
    method: 'POST',
    contentType: 'application/json',
    params: function(current, limit) {
      return {
        skipCount: (current - 1) * limit,
        maxResultCount: limit
      };
    },
    map: function(data) {
      return {
        code: 0,
        msg: data.error,
        count: data.result.totalCount,
        data: data.result.items
      };
    },
    page: true, //开启分页
    cols: [
      [
        { type: 'numbers' },
        { type: 'checkbox' },
        { field: 'userName', title: '登录名' },
        { field: 'name', title: '用户名' },
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
      callback: function() {
        table.reload('main-table');
      }
    });
  });
});
