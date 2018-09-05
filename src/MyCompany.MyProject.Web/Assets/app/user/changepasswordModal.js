define([
    'main',
    'text!/Views/User/_changePasswordModal.html',
    'lay!form',
    'lay!layer'], function (main, modalView) {
    var form = layui.form;
    var layer = layui.layer;
        var userService = abp.services.app.user;
        var usersessionService = abp.services.app.session;
        var modal = {
            index: 0,
            model: {},
            callback: null,
            roles: null,
            init: function (params) {
                usersessionService.getCurrentLoginInformations().then(function (res) {
                    modal.model = res.user;
                });
                modal.initForm();
            },
            initForm: function () {
                form.val('form-changepassword', modal.model);

                // set roles

                form.on('submit(changesubmit)', function (data) {
                    var action = userService.changePassword
                    action(modal.normalize(data.field)).then(function (result) {
                        layer.close(modal.index);
                        if (result.succeeded === true) {
                            layer.msg('密码修改成功', {
                                time: 2000, //20s后自动关闭
                                btn: ['好的'],
                                icon: 1
                            });
                        }
                        else {
                            layer.msg('密码修改失败', {
                                time: 2000, //20s后自动关闭
                                btn: ['好的'],
                                icon: 2 
                            });
                        }
                    });
                    return false;
                });

                form.verify({
                    confirm: function (value, item) {
                        // bad way
                        if (value != $('input[name=newPassword]').val()) {
                            return '密码不一致';
                        }
                    }
                });
            },
            open: function (params) {
                modal.index = layer.open({
                    type: 1,
                    title: '修改密码',
                    area: '400px',
                    resize: false,
                    content: modalView
                });

                modal.init(params);
            },
            close: function () {
                layer.close(modal.index);
            },
            normalize: function (data) {
                var item = Object.assign({ isActive: true, surname: data.name, roleNames: [] }, modal.model, data);
                // clear roles
                item.roleNames.length = 0;
                // reset roles
                var roleProps = [];
                for (var key in item) {
                    var match = key.match(/role\[(.*)\]$/);
                    if (match && item[key] == 'on') {
                        item.roleNames.push(match[1]);
                        roleProps.push(key);
                    }
                }
                roleProps.forEach(function (key) {
                    delete item[key];
                });
                return item;
            }
        };
    return {
        create: function (params) {
            params.model = {};
            modal.open(params);
        },
        close: modal.close
    };
})