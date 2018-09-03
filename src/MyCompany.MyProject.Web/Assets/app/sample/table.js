define(['main', 'lib/store', 'lib/table-setting/tableSetting', 'lay!table'], function(main, store, settingModal) {
  var table = layui.table;
  var $ = layui.$;

  var config = store.getItem('table_sample');
  if (!config) {
    config = {
      fields: [
        { field: 'id', width: 80, title: 'ID', sort: true },
        { field: 'username', width: 80, title: '用户名' },
        { field: 'sex', width: 80, title: '性别', sort: true },
        { field: 'city', width: 80, title: '城市' },
        { field: 'sign', title: '签名', width: '30%', minWidth: 100 },
        { field: 'experience', title: '积分', sort: true },
        { field: 'score', title: '评分', sort: true },
        { field: 'classify', title: '职业' },
        { field: 'wealth', width: 137, title: '财富', sort: true }
      ]
    };
    store.setItem('table_sample', config);
  }

  $('#btn-setting').click(function() {
    settingModal.open(config.fields, function(cols) {
      config.fields = cols;
      store.setItem('table_sample', config);
      table.reload('main-table', {
        cols: [config.fields]
      });
    });
  });

  table.render({
    id: 'main-table',
    elem: '#main-table',
    cellMinWidth: 80,
    url: '/assets/app/sample/data.json',
    cols: [config.fields]
  });
});
