define(['main', 'dayjs', 'lay!form'], function(main, dayjs) {
  var $ = layui.$;
  var form = layui.form;
  var userService = abp.services.app.user;
  var usersessionService = abp.services.app.session;
  var modal = {
    init: function() {
      userService.getPersonalInfo({}).then(function(data) {
        data.items[0].creationTime = dayjs(data.items[0].creationTime).format('YYYY-MM-DD HH:mm:ss');
        data.items[0].lastLoginTime = dayjs(data.items[0].lastLoginTime).format('YYYY-MM-DD HH:mm:ss');
        let temp = [];
        data.items[0].roles.forEach(function(d) {
          temp.push(d[2]);
        });
        data.items[0].roles = temp.join(',');
        form.val('form-personal', data.items[0]);
      });
    }
  };
  modal.init();
});
