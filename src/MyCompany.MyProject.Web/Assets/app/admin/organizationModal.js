define(['main', 'text!/Views/Admin/_organizationModal.html', 'lay!form', 'lay!layer'], function(main, modalView) {
  var form = layui.form;
  var layer = layui.layer;

  var mainService = abp.services.app.organizationUnit;

  var modal = {
    index: 0,
    isEdit: false,
    model: {},
    callback: null,
    init: function(params) {
      modal.model = params.model;
      modal.callback = params.callback;

      modal.isEdit && form.val('form-add', modal.model);

      form.on('submit(add)', function(data) {
        var action = modal.isEdit ? mainService.updateOrganizationUnit : mainService.createOrganizationUnit;
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
        area: '400px',
        content: modalView
      });
      modal.init(params);
    },
    close: function() {
      layer.close(modal.index);
    },
    normalize: function(data) {
      return $.extend({}, modal.model, data);
    }
  };

  return {
    create: function(parentId, callback) {
      modal.isEdit = false;
      modal.open({
        model: { parentId: parentId },
        callback: callback
      });
    },
    edit: function(model, callback) {
      modal.isEdit = true;
      modal.open({
        model: model,
        callback: callback
      });
    },
    close: modal.close
  };
});
