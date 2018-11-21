define(['main', 'text!/Views/Admin/_dictionaryItemModal.html', 'lay!form', 'lay!layer', 'lay!laytpl'], function(main, modalView) {
  var form = layui.form;
  var layer = layui.layer;
  var laytpl = layui.laytpl;
  var table = layui.table;
  var abp = main.abp;

  var service = abp.services.app.dictionary;

  var modal = {
    index: 0,
    isEdit: false,
    model: {},
    type: null,
    callback: null,
    open: function(params) {
      modal.index = layer.open({
        type: 1,
        title: modal.isEdit ? '编辑' : '添加',
        area: '400px',
        content: laytpl(modalView).render(params.type)
      });

      modal.init(params);
    },
    init: function(params) {
      modal.model = modal.isEdit ? params.model : { typeId: params.type.typeId };
      modal.type = params.type;
      modal.callback = params.callback;
      modal.initForm();
    },
    initForm: function() {
      form.val('main', modal.model);

      form.on('submit(save)', function(data) {
        var action = modal.isEdit ? service.update : service.create;
        action(modal.normalize(data.field)).then(function(result) {
          modal.callback && modal.callback(result);
          layer.close(modal.index);
        });
        return false;
      });
    },
    close: function() {
      layer.close(modal.index);
    },
    normalize: function(data) {
      var item = $.extend({}, modal.model, data);
      return item;
    }
  };

  return {
    create: function(params) {
      modal.isEdit = false;
      modal.open(params);
    },
    edit: function(params) {
      modal.isEdit = true;
      modal.open(params);
    },
    close: modal.close
  };
});
