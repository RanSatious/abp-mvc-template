define(['main', 'text!/Views/Admin/_roleModal.html', 'lay!form', 'lay!layer', 'lay!laytpl', 'jstree'], function(
  main,
  modalView
) {
  console.log('role modal loaded');
  var form = layui.form;
  var layer = layui.layer;
  var laytpl = layui.laytpl;

  var roleServices = abp.services.app.role;

  var modal = {
    index: 0,
    isEdit: false,
    model: {},
    permissions: [],
    callback: null,
    init: function(params) {
      modal.model = params.model;
      modal.permissions = params.permissions;
      modal.callback = params.callback;

      modal.initTree();
      console.log(modal.permissions);
      modal.isEdit && form.val('form-role', modal.model);

      form.on('submit(addRole)', function(data) {
        var action = modal.isEdit ? roleServices.update : roleServices.create;
        action(modal.normalize(data.field)).then(function(result) {
          modal.callback && modal.callback(result);
          layer.close(modal.index);
        });
        return false;
      });
    },
    initTree: function() {
      $('.permissions-container').jstree({
        core: {
          data: modal.permissions
        },
        plugins: ['checkbox']
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
      return Object.assign({ isStatic: false, normalizedName: '', permissions: [] }, modal.model, data);
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
