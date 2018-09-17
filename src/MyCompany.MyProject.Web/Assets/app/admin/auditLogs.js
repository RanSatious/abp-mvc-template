define(['main', 'dayjs', 'lay!form', 'lay!table'], function(main, dayjs) {
  var table = layui.table;
  var $ = layui.$;
  var form = layui.form;
  table.render({
    elem: '#main-table',
    id: 'main-table',
    cellMinWidth: 80,
    url: '/api/services/app/auditLogs/Get',
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
    limits: [10, 20, 30, 50, 100],
    limit: 10,
    cols: [
      [
        { field: 'userName', title: '用户名', sort: true },
        { field: 'serviceName', title: '服务', width: '28%', minWidth: 100 },
        { field: 'methodName', title: '方法', width: '8%', minWidth: 50 },
        { field: 'parameters', title: '参数', width: '40%', minWidth: 100 },
        { field: 'executionTime', title: '执行时刻', width: '15%', minWidth: 100, sort: true },
        { field: 'executionDuration', title: '执行时间' },
        { field: 'clientIpAddress', title: 'IP地址', width: '10%', minWidth: 100 },
        { field: 'clientName', title: '客户端', width: '12%', minWidth: 100 },
        { field: 'browserInfo', title: '浏览器信息', width: '13%', minWidth: 100 }
      ]
    ]
  });
  $('#btn-search').click(function() {
    var name = $('#userName').val();
    table.reload('main-table', {
      where: {
        userName: name
      }
    });
  });
});
