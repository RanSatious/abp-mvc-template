define(['abp/abp', 'lay!table'], function(abp) {
  var table = layui.table;
  console.log(table);
  //第一个实例
  table.render({
    elem: '#main-table',
    cellMinWidth: 80,
    url: '/api/services/app/user/GetAll',
    method: 'POST',
    contentType: 'application/json',
    map: function(data) {
      console.log(data);
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
        //表头
        { field: 'id', title: 'ID' },
        { field: 'userName', title: 'userName'},
        { field: 'name', title: 'name'},
        { field: 'surname', title: 'surname'},
      ]
    ]
  });
});
