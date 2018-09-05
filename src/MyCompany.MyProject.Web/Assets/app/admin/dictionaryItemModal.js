define(['main',
    'text!/Views/Admin/_dictionaryItemModal.html',
    'lay!form',
    'lay!layer',
    'lay!laytpl'], function (main, modalView) {
        var form = layui.form;
        var layer = layui.layer;
        var laytpl = layui.laytpl;
        var table = layui.table;
        var abp = main.abp;

        var dictionaryService = abp.services.app.dictionary;

        var modal = {
            index: 0,
            isEdit: false,
            model: {},
            callback: null,
            open: function (params) {
                modal.index = layer.open({
                    type: 1,
                    title: modal.isEdit ? '编辑' : '添加',
                    area: ['600px,600px'],
                    content: laytpl(modalView).render(params)
                });

                modal.init(params);
            },
            init: function (params) {
                modal.model = params.model;
                modal.callback = params.callback;
                modal.initForm();


            },
            initForm: function () {
                form.val('form-user', modal.model);

                form.on('submit(addDictionaryItem)', function (data) {

                    var action = modal.isEdit ? dictionaryService.update : dictionaryService.create;
                    action(modal.normalize(data.field)).then(function (result) {
                        modal.callback && modal.callback(result);
                        layer.close(modal.index);
                        table.reload('main-table');
                    });
                    return false;
                });
            },
            close: function () {
                layer.close(modal.index);
            },
            normalize: function (data) {
                var item = Object.assign({ info: data.info, name: data.name, order: data.order, type: data.type },modal.model,data);
                
                return item;
            },
        };

        return {
            create: function (params) {
                params.model = { type: params.id, typeName: params.name };
                modal.isEdit = false;
                modal.open(params);
            },
            edit: function (params) {
                var source = { type: params.type.id, typeName: params.type.name };
                var item = Object.assign(params.model, source);
                params.model = item;
                modal.isEdit = true;
                modal.open(params);
            },
            close: modal.close
        };
    });