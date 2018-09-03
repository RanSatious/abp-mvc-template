define(['main', 'lay!layer'], function() {
  var layer = layui.layer;

  var module = {
    loginOvertime: function() {
      layer.msg(
        '登录超时，请重新登录',
        {
          icon: 2,
          time: 1000
        },
        function(index) {
          layer.close(index);
          top.window.location = '/Account/Login?ReturnUrl=' + encodeURIComponent(window.location.pathname);
        }
      );
    }
  };

  return module;
});
