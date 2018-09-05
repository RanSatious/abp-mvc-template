define(['main', 'lay!form', 'lay!laydate'], function (main) {
    var $ = layui.$;
    var form = layui.form;
    var laydate = layui.laydate;
    var userService = abp.services.app.user;
    var usersessionService = abp.services.app.session;
    var roleService = abp.services.app.role;
    laydate.render({
        elem: '#createtime'
        , type: 'datetime'
    });
    laydate.render({
        elem: '#lastLoginTime'
        , type: 'datetime'
    });
   
    function formatDateTime(inputTime) {
        var date = new Date(inputTime);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        var minute = date.getMinutes();
        var second = date.getSeconds();
        minute = minute < 10 ? ('0' + minute) : minute;
        second = second < 10 ? ('0' + second) : second;
        return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
    };
    var modal = {
        isEdit: false,
        model: {},
        roles: null,
        init: function (params) {
            modal.model = params.model;
            modal.roles = params.roles;
            modal.initForm();
        },
        initForm: function () {
            form.val('form-personal', modal.model);

            // set roles
            if (modal.isEdit) {
                modal.roles.forEach(function (d, index) {
                    $('#personal-roles').append(`<input type="checkbox" name="role[${d.name}]" lay-skin="primary" title="${d.displayName}" disabled>`);
                });
                var roles = {};
                modal.model.roles.forEach(function (d) {
                    roles['role[' + d[1] + ']'] = true;
                });
                form.val('form-personal', roles);
            }

        },
        open: function (params) {
            modal.init(params);
        }
    }

    async function personalInfo() {
        var backdata = await userData();
        var rolesdata = await Roles();
        modal.isEdit = true;
        modal.open({
            model: backdata,
            roles: rolesdata
        });

    }
    async function userData() {
        return await usersessionService.getCurrentLoginInformations({}).then(async function (res) {
            return await userService.getAll({ maxResultCount: 9999 }).then(async function (data) {
                let result = data.items.filter(datas => datas.id == res.user.id);
                let backdata = result[0];
                backdata.creationTime = formatDateTime(backdata.creationTime);
                backdata.lastLoginTime = formatDateTime(backdata.lastLoginTime);
                return await backdata;
            });
        });
    }
    async function Roles() {
        return roleService.getAll({ maxResultCount: 9999 }).then(async function (result) {
            let data = result.items;
            return await data;
        });
    }
    return {
        personalInfo: personalInfo()
    };
})