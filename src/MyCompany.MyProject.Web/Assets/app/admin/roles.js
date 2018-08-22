define(['main', 'app/admin/roleModal', 'lay!table', 'lay!form'], function(main, roleModal) {
  var $ = layui.$;
  var table = layui.table;
  var form = layui.form;

  var roleServices = abp.services.app.role;

  table.render({
    id: 'main-table',
    elem: '#main-table',
    cellMinWidth: 80,
    url: '/api/services/app/role/GetAll',
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
      roleModal.edit(data, function() {
        table.reload('main-table');
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
    roleModal.create(function() {
      table.reload('main-table');
    });
  });
});
