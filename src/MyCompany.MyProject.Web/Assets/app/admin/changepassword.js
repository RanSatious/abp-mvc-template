//define([
//    'main',
//    'lay!form',
//    'lay!layer'],
//    function (main) {
//        var form = layui.form;
//        var layer = layui.layer;
//        var userService = abp.services.app.user;
//        var usersessionService = abp.services.app.session;
//        async function getCurrentLoginInformations(){
//            return await usersessionService.getCurrentLoginInformations().then(async function (res) {
//                return await res.user;
//            });
//        }
//        form.verify({
//            confirm: function (value, item) {
//                // bad way
//                if (value != $('input[name=newPassword]').val()) {
//                    return '密码不一致';
//                }
//            }
//        });
//        form.on('submit(changesubmit)', async function (data) {
//            console.log("123");
//            var action = userService.changePassword
//            let userIddata = await getCurrentLoginInformations();
//            console.log('userid', userIddata);
//            let userdata = await normalize(data, userIddata);
//            await action(userdata).then(function (result) {
//                if (result.succeeded === true) {
//                    layer.msg('密码修改成功', {
//                        time: 2000, //20s后自动关闭
//                        btn: ['好的'],
//                        icon: 1
//                    });
//                }
//                else {
//                    layer.msg('密码修改失败', {
//                        time: 2000, //20s后自动关闭
//                        btn: ['好的'],
//                        icon: 2
//                    });
//                }
//            });
//        });
//        async function normalize(data, userIddata) {
//            var item = Object.assign({ isActive: true, surname: data.name, roleNames: [] }, userIddata, data);
//            // clear roles
//            item.roleNames.length = 0;
//            // reset roles
//            var roleProps = [];
//            for (var key in item) {
//                var match = key.match(/role\[(.*)\]$/);
//                if (match && item[key] == 'on') {
//                    item.roleNames.push(match[1]);
//                    roleProps.push(key);
//                }
//            }
//            roleProps.forEach(function (key) {
//                delete item[key];
//            });
//            return await item;
//        }
//    })
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
            init: function () {
                usersessionService.getCurrentLoginInformations().then(function (res) {
                    modal.model = res.user;
                });
                modal.initForm();
            },
            initForm: function () {
                form.on('submit(changesubmit)', function (data) {
                    console.log('data', data);
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
            open: function () {
                //modal.index = layer.open({
                //    type: 1,
                //    title: '修改密码',
                //    area: '400px',
                //    resize: false,
                //    content: modalView
                //});

                modal.init();
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
        function changepassword() {
            modal.open();
        }
        return {
            changepassword: changepassword()
        };
    })