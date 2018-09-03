define(['lib/utils', 'lay!table'], function(utils) {
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
        utils.loginOvertime();
      }
    }
  });
});
