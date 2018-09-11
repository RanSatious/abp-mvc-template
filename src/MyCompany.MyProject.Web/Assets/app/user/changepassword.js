define(['main', 'lay!form', 'lay!layer'], function(main) {
  var form = layui.form;
  var userService = abp.services.app.user;
  var modal = {
    model: {},
    init: function() {
      modal.initForm();
    },
    initForm: function() {
      form.on('submit(changesubmit)', function(data) {
        var action = userService.changePassword;
        action(data.field).then(function(result) {
          if (result.succeeded) {
            abp.notify.success('密码修改成功');
          } else {
            abp.notify.success('密码修改失败');
          }
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
  modal.init();
});
