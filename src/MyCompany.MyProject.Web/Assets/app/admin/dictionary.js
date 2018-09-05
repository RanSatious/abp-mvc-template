define(['main', 'app/admin/dictionaryTypeModal', 'app/admin/dictionaryItemModal', 'lib/table', 'lay!form'], function (main, dictionaryTypeModal,dictionaryItemModal) {
    var $ = layui.$;
    var table = layui.table;
    var form = layui.form;
    var abp = main.abp;

    var typeService = abp.services.app.dictionaryType;
    var _service = abp.services.app.dictionary;

    var modal = {
        _lstType: $('#select-type'),
        init: function () {
            typeService.getAll({}).done(function (result) {
                result.items.forEach(function (item) {
                    modal._lstType.append($('<option>').val(item.id).text(item.displayName));
                });
                //表单重新渲染，要不然显示不出来新添加的option
                form.render();
            }).done(function () {
                modal.showTableData();
                
            });

            
        },
        showTableData: function () {
            table.render({
                elem: '#main-table',
                cellMinWidth: 80,
                url: '/api/services/app/dictionary/GetAll',
                method: 'POST',
                contentType: 'application/json',
                params: function (current, limit) {
                    return {
                        skipCount: (current - 1) * limit,
                        maxResultCount: limit,
                        filter:modal.getSelectedType().id
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
                cols: [
                    [
                        { type: 'numbers' },
                        { type: 'checkbox' },
                        { field: 'name', title: '名称' },
                        { field: 'value', title: '值' },
                        { field: 'order', title: '排序' },
                        { field: 'action', title: '操作', width: 120, toolbar: '#actionTpl', align: 'center', unresize: true }
                    ]
                ]
            });
        },
        getSelectedType: function () {
            var selectType = modal._lstType.find('option:selected');
            var type = {
                id: '',
                name: ''
            };
            if (selectType.length > 0) {
                type.id = selectType.val();
                type.name = selectType.text();
            };
            return type;
        },
    };

    modal.init();

    //监听工具条
    table.on('tool(dictionary)', function (obj) {
        var data = obj.data;
        if (obj.event == 'edit') {
            var type = modal.getSelectedType();
            if (!type.id) {
                abp.message.error('请选择类型');
                return;
            }
            dictionaryItemModal.edit({
                model: data,
                type:type,
                callback: function () {
                    table.reload('main-table');
                }
            });
        } else if (obj.event === 'delete') {
            abp.message.confirm('是否删除？').then(function (result) {
                if (!result) return;
                _service.delete({ id: data.id }).then(function () {
                    table.reload('main-table');
                });
            });
        }
    });

    form.on('submit', function (data) {
        return false;
    });

    $('#btn-addDictionary').click(function () {
        var type = modal.getSelectedType();
        if (!type.id) {
            abp.message.error('请选择类型');
            return;
        }

        dictionaryItemModal.create(type);
    });

    $('#btn-dictionaryType').click(function () {
        dictionaryTypeModal.create({
            callback: function () {
            }
        });
    });

    $('#btn-deleteDictionary').click(function () {
        var checkStatus = table.checkStatus('main-table');
        var data = checkStatus.data;
        if (!data.length) {
            abp.message.warn('请选择项目');
            return;
        }

        abp.message.confirm('是否删除所选项目？').then(function (result) {
            if (!result) return;
            _service.deleteAll(data.map(function (item) { return item.id; })).done(function () {
                abp.notify.success('删除成功');
                table.reload('main-table');
            });
        });
    });

    form.on('select(selectTypeChange)', function (data) {
        table.reload('main-table');
    });
});
