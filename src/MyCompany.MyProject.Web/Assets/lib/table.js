define(['lay!table'], function() {
  var table = layui.table;

  table.set({
    method: 'POST',
    contentType: 'application/json',
    page: true,
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
    error: function(error, message) {
      if (error.status == 401) {
        layer.msg('登录超时，请重新登录', {
          icon: 2,
          time: 1000
        }, function(index) {
          layer.close(index);
          top.window.location = '/Account/Login?ReturnUrl=' + encodeURIComponent(window.location.pathname);
        });
      }
    }
  });
});