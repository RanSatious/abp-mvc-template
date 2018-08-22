define(['main', 'lay!table', 'lay!form', 'lay!layer'], function(main) {
  var $ = layui.$;
  var table = layui.table;
  var form = layui.form;
  var layer = layui.layer;

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
        { field: 'id', title: 'ID' },
        { field: 'userName', title: 'userName' },
        { field: 'name', title: 'name' },
        { field: 'surname', title: 'surname' },
        { field: 'test', title: '可用', width: 85, templet: '#switchTpl', unresize: true },
        { field: 'action', title: '操作', width: 120, toolbar: '#actionTpl', align: 'center', unresize:true },
      ]
    ]
  });

  form.on('switch(sexDemo)', function(obj) {
    layer.tips(this.value + ' ' + this.name + '：' + obj.elem.checked, obj.othis);
  });

  form.on('submit', function(data) {
    console.log(data);
    return false;
  });

  $('#btn-add').click(function() {
    layer.open({
      type: 1,
      title: '新增11',
      content: '<b>123</b>'
    });
  });
});
