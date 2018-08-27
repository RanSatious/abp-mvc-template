define(['main', 'app/admin/roleModal', 'lib/table', 'lay!form', '!lay!layer'], function(main, roleModal) {
  var $ = layui.$;
  var table = layui.table;
  var form = layui.form;
  var layer = layui.layer;

  var roleServices = abp.services.app.role;

  var permissions = [];
  roleServices.getAllPermissions().then(function(result) {
    permissions = result.items.map(function(item) {
      var names = item.name.split('.');
      var parent = '#';
      if (names.length > 1) {
        names.pop();
        parent = names.join('.');
      }
      return {
        id: item.name,
        parent: parent,
        text: item.displayName,
        state: {
          opened: true
        }
      };
    });
  });

  table.render({
    id: 'main-table',
    elem: '#main-table',
    cellMinWidth: 80,
    url: '/api/services/app/role/GetAll',
    cols: [
      [
        { type: 'numbers' },
        { type: 'checkbox' },
        { field: 'name', title: 'name' },
        { field: 'displayName', title: 'displayName' },
        { field: 'action', title: '操作', width: 120, toolbar: '#actionTpl', align: 'center', unresize: true }
      ]
    ]
  });

  //监听工具条
  table.on('tool(role)', function(obj) {
    var data = obj.data;
    console.log(obj);
    if (obj.event == 'edit') {
      roleModal.edit({
        model: data,
        permissions: permissions,
        callback: function() {
          table.reload('main-table');
        }
      });
    } else if (obj.event === 'delete') {
      abp.message.confirm('是否删除？').then(function(result) {
        if (!result) return;
        roleServices.delete({ id: data.id }).then(function() {
          table.reload('main-table');
        });
      });
    }
  });

  form.on('submit', function(data) {
    return false;
  });
  form.on('submit(search)', function(data) {
    console.log(data);
    table.reload('main-table', {
      where: data.field
    });
    return false;
  });

  $('#btn-add').click(function() {
    roleModal.create({
      permissions: permissions,
      callback: function() {
        table.reload('main-table');
      }
    });
  });
});
