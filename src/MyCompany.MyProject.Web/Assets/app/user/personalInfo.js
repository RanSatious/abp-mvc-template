define(['main', 'dayjs', 'lay!form'], function(main, dayjs) {
  var $ = layui.$;
  var form = layui.form;
  var userService = abp.services.app.user;
  var data = {
    init: function() {
      data.initForm();
    },
    initForm: function() {
      userService.getPersonalInfo().then(function(res) {
        res.items[0].creationTime = dayjs(res.items[0].creationTime).format('YYYY-MM-DD HH:mm:ss');
        res.items[0].lastLoginTime = dayjs(res.items[0].lastLoginTime).format('YYYY-MM-DD HH:mm:ss');
        let temp = [];
        res.items[0].roles.map(function(d) {
          temp.push(d[2]);
        });
        res.items[0].roles = temp.join(',');
        form.val('form-personal', res.items[0]);
      });
      form.on('submit(updateUser)', function(result) {
        var action = userService.updatePrsonalInfo;
        action(data.normalize(result.field))
          .then(function(resultres) {
            if (resultres.succeeded) {
              abp.notify.success('个人信息修改成功');
            } else {
              abp.notify.error(resultres.errors[0]);
            }
          })
          .catch(function(e) {
            utils.loginOvertime();
          });
        return false;
      });
    },
    normalize: function(result) {
      var res = Object.assign(
        {
          creationTime: result.creationTime,
          emailAddress: result.emailAddress,
          id: result.id,
          isActive: result.isActive,
          lastLoginTime: result.lastLoginTime,
          name: result.name
        },
        result
      );
      if (res.isActive == 'on') {
        res.isActive = true;
      } else {
        res.isActive = false;
      }
      return res;
    }
  };
  data.init();
});
