define(['main', 'text!/Views/Admin/_dictionaryTypeModal.html', 'lay!form', 'lay!layer', 'lay!laytpl'], function(main, modalView) {
  var form = layui.form;
  var layer = layui.layer;
  var laytpl = layui.laytpl;

  var service = abp.services.app.dictionaryType;

  var modal = {
    index: 0,
    isEdit: false,
    model: {},
    callback: null,
    init: function(params) {
      modal.model = params.model;
      modal.callback = params.callback;

      modal.isEdit && form.val('form-type', modal.model);

      form.on('submit(add)', function(data) {
        var action = modal.isEdit ? service.update : service.create;
        action(modal.normalize(data.field)).then(function(result) {
          modal.callback && modal.callback(result);
          layer.close(modal.index);
        });
        return false;
      });
    },
    open: function(params) {
      modal.index = layer.open({
        type: 1,
        title: modal.isEdit ? '编辑' : '新增',
        area: '300px',
        content: laytpl(modalView).render({ isEdit: modal.isEdit })
      });
      modal.init(params);
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
      params.model = {};
      modal.open(params);
    },
    edit: function(params) {
      modal.isEdit = true;
      modal.open(params);
    },
    close: modal.close
  };
});
