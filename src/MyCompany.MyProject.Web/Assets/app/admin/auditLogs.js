define(['main', 'lay!form', 'lib/table'], function(main) {
  var table = layui.table;
  table.render({
    elem: '#main-table',
    id: 'main-table',
    url: '/api/services/app/auditLogs/Get',
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
