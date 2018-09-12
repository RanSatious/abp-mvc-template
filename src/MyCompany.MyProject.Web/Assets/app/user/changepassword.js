define(['main', 'lib/utils', 'lay!form', 'lay!layer'], function(main, utils) {
  var form = layui.form;
  var userService = abp.services.app.user;
  var data = {
    model: {},
    init: function() {
      data.initForm();
    },
    initForm: function() {
      form.on('submit(changesubmit)', function(res) {
        var action = userService.changePassword;
        action(res.field)
          .then(function(result) {
            if (result.succeeded) {
              abp.notify.success('密码修改成功');
              setTimeout("location.href='/Account/Logout'", 1500); //延时1500ms（毫秒执行跳转）
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
    }
  };
  data.init();
});
