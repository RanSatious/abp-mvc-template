define(['main', 'dayjs','lay!form'], function (main,dayjs) {
    var $ = layui.$;
    var form = layui.form;
    var userService = abp.services.app.user;
    var usersessionService = abp.services.app.session;
    var roleService = abp.services.app.role;
    var modal = {
        model: {},
        roles: [],
        init: function () {
            modal.model=usersessionService.getCurrentLoginInformations({}).then(function (res) {
                userService.getPersonalInfo({ UserName: res.user.userName }).then(function (data) {
                    data.items[0].creationTime = dayjs(data.items[0].creationTime).format('YYYY-MM-DD HH:mm:ss');;
                    data.items[0].lastLoginTime = dayjs(data.items[0].lastLoginTime).format('YYYY-MM-DD HH:mm:ss');;
                    console.log('data.items[0]', data.items[0].roles)
                    form.val('form-personal', data.items[0]);
                    data.items[0].roles.forEach(function (d, index) {
                        $('#personal-roles').append(`<input type="checkbox" name="role[${d[1]}]" lay-skin="primary" title="${d[2]}" disabled>`);
                    });
                    var roles = {};
                    data.items[0].roles.forEach(function (d) {
                        roles['role[' + d[1] + ']'] = true;
                    });
                    form.val('form-personal', roles);
                });
            });
        },
        initForm: function () {
            let models = modal.normalizemodel();
            let roless = modal.normalizeroles();
            form.val('form-personal', models);
            roless.forEach(function (d, index) {
                $('#personal-roles').append(`<input type="checkbox" name="role[${d.name}]" lay-skin="primary" title="${d.displayName}" chencked="" disabled>`);
            });
        }
    }
    modal.init();
})