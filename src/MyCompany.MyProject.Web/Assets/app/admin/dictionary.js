define(['main', 'app/admin/dictionaryItemModal', 'lib/table', 'lay!form'], function(main, modal) {
  var table = layui.table;
  var form = layui.form;
  var abp = main.abp;

  var service = abp.services.app.dictionary;
  var params = {
    typeId: $('#select-type option:selected').val() || null,
    typeName: $('#select-type option:selected').text() || ''
  };

  table.render({
    id: 'main-table',
    elem: '#main-table',
    url: '/api/services/app/dictionary/GetAll',
    params: function(current, limit) {
      return {
        skipCount: (current - 1) * limit,
        maxResultCount: limit,
        filter: params.typeId
      };
    },
    cols: [
      [
        { type: 'numbers' },
        { field: 'name', title: '名称' },
        { field: 'info', title: '说明' },
        { field: 'action', title: '操作', width: 120, toolbar: '#actionTpl', align: 'center', unresize: true }
      ]
    ]
  });

  //监听工具条
  table.on('tool(main)', function(obj) {
    var data = obj.data;
    if (obj.event == 'edit') {
      if (!params.typeId) {
        abp.message.error('请选择类型');
        return;
      }
      modal.edit({
        model: data,
        type: params,
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

  form.on('submit', function(data) {
    return false;
  });

  form.on('select(selectTypeChange)', function(data) {
    params.typeId = $('#select-type option:selected').val();
    params.typeName = $('#select-type option:selected').text();
    table.reload('main-table');
  });

  $('#btn-add').click(function(e) {
    e.preventDefault();
    modal.create({
      type: params,
      callback: function() {
        table.reload('main-table');
      }
    });
  });
});
