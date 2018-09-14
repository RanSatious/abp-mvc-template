define(['main', 'lib/utils', 'lay!form', 'lay!layer'], function(main, utils) {
  var form = layui.form;
  var userService = abp.services.app.user;
  form.on('submit(changesubmit)', function(res) {
    userService
      .changePassword(res.field)
      .then(function(result) {
        if (result.succeeded) {
          abp.notify.success('密码修改成功，请重新登录');
          setTimeout(function() {
            location.href = '/Account/Logout';
          }, 1500);
        } else {
          abp.notify.error(result.errors[0]);
        }
      })
      .catch(function(e) {
        utils.loginOvertime();
      });
    return false;
  });

  form.verify({
    confirm: function(value, item) {
      if (value != $('input[name=newPassword]').val()) {
        return '密码不一致';
      }
    }
  });
});
