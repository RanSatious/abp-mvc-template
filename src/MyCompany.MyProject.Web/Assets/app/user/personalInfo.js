define(['main', 'lib/utils', 'dayjs', 'lay!form'], function(main, utils, dayjs) {
  var form = layui.form;
  var userService = abp.services.app.user;

  userService.getPersonalInfo().then(function(res) {
    res.creationTime = dayjs(res.creationTime).format('YYYY-MM-DD HH:mm:ss');
    res.lastLoginTime = dayjs(res.lastLoginTime).format('YYYY-MM-DD HH:mm:ss');

    res.roles = res.roles.map(function(d) {
      return d[2];
    });
    form.val('form-personal', res);

    form.on('submit(updateUser)', function(data) {
      userService
        .updatePrsonalInfo({
          id: res.id,
          emailAddress: data.field.emailAddress
        })
        .then(function(result) {
          if (result.succeeded) {
            abp.notify.success('个人信息修改成功');
          } else {
            abp.notify.error(result.errors[0]);
          }
        })
        .catch(function(e) {
          utils.loginOvertime();
        });
      return false;
    });
  });
});
