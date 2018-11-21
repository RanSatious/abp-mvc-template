define(['main', 'app/admin/dictionaryTypeModal', 'lib/table'], function(main, modal) {
  var table = layui.table;

  var service = abp.services.app.dictionaryType;

  table.render({
    id: 'main-table',
    elem: '#main-table',
    cellMinWidth: 80,
    url: '/api/services/app/dictionaryType/GetAll',
    cols: [
      [
        { type: 'numbers' },
        { field: 'name', title: '类型名称' },
        { field: 'displayName', title: '显示名称' },
        { field: 'action', title: '操作', width: 120, toolbar: '#actionTpl', align: 'center', unresize: true }
      ]
    ]
  });

  table.on('tool(main)', function(obj) {
    var data = obj.data;
    if (obj.event == 'edit') {
      modal.edit({
        model: data,
        callback: function() {
          table.reload('main-table');
        }
      });
    } else if (obj.event === 'delete') {
      abp.message.confirm('是否删除？').then(function(result) {
        if (!result) return;
        service.delete({ id: data.id }).then(function() {
          table.reload('main-table');
        });
      });
    }
  });

  $('#btn-add').click(function(e) {
    e.preventDefault();
    modal.create({
      callback: function() {
        table.reload('main-table');
      }
    });
  });
});
