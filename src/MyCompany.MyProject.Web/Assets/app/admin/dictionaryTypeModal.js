define(['main',
    'text!/Views/Admin/_dictionaryTypeModal.html',
    'lay!form',
    'lay!layer',
    'lay!laytpl'], function (main, modalView) {
    var form = layui.form;
    var layer = layui.layer;
    var laytpl = layui.laytpl;
    var table = layui.table;
    var abp = main.abp;

    var _service = abp.services.app.dictionaryType;

    var modal = {
        index: 0,
        callback: null,
        open: function (params) {
            modal.index = layer.open({
                type: 1,
                title: '字典类型',
                area: ['600px', '600px'],
                content: laytpl(modalView).render(params),
                end: function () {
                    location.reload();
                }
            });

            modal.callback = params.callback;
            modal.init();
        },
        showEdit: function (data) {
            modal.removeAddClass('.edit-type','.add-type');
            $('input[name=input-edit-name]').val(data.name);
            $('input[name=input-edit-displayName]').val(data.displayName);
            $('input[name=id]').val(data.id);
        },
        removeAddClass: function (removehideclass,addhideclass) {
            $(removehideclass).removeClass('layui-hide');
            $(addhideclass).addClass('layui-hide');
        },
        init: function () {
            modal.showTableData();

            form.on('submit(adddictionaryType)', function (data) {
                _service.create({
                    name: data.field.dictionaryTypeName,
                    displayName: data.field.showName
                }).done(function () {
                    abp.notify.success('添加成功');
                    table.reload('main-table2');
                    $('input').val("")
                });
            });

            table.on('tool(dictionary)', function (obj) {
                var data = obj.data;
                if (obj.event == 'edit') {
                    modal.showEdit(data);

                    //点击保存后触发事件
                    form.on('submit(updatedictionaryType)', function () {
                        _service.update({
                            id: $('input[name=id]').val(),
                            name: $('input[name=input-edit-name]').val(),
                            displayName: $('input[name=input-edit-displayName]').val()
                        }).done(function () {
                            abp.notify.success('保存成功');
                            table.reload('main-table2');
                            modal.removeAddClass('.add-type','.edit-type');
                        });
                    });

                    //点击取消后触发事件
                    form.on('submit(caceldictionaryType)', function () {
                        modal.removeAddClass('.add-type','.edit-type');
                    });
                } else if (obj.event === 'delete') {
                    abp.message.confirm('是否删除？').then(function (result) {
                        if (!result) return;
                        _service.delete({ id: data.id }).then(function () {
                            abp.notify.success('删除成功');
                            table.reload('main-table2');
                            $('input').val("")
                        });
                    });
                }
            });
        },
        showTableData: function () {
            table.render({
                elem: '#main-table2',
                cellMinWidth: 80,
                url: '/api/services/app/dictionaryType/GetAll',
                method: 'POST',
                contentType: 'application/json',
                params: function (current, limit) {
                    return {
                        skipCount: (current - 1) * limit,
                        maxResultCount: limit
                    };
                },
                map: function (data) {
                    return {
                        code: 0,
                        msg: data.error,
                        count: data.result.totalCount,
                        data: data.result.items
                    };
                },
                page: true, //开启分页
                limits: [5, 10, 15],
                limit:5,
                cols: [
                    [
                        { field: 'name', title: '名称' },
                        { field: 'displayName', title: '显示名称' },
                        { field: 'action', title: '操作', width: 120, toolbar: '#actionDictionaryTpl', align: 'center', unresize: true }
                    ]
                ]
            });
        },
        close: function () {
            layer.close(modal.index);
        },
    };

    return {
        create: function (params) {
            params.model = {};
            modal.open(params);
        },
        edit: function (params) {
            modal.open(params);
        },
        close: modal.close
    };
});