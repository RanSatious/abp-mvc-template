define(['main', 'text!/Views/Admin/_roleModal.html', 'lay!form', 'lay!layer', 'lay!laytpl'], function(
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
    callback: null,
    init: function() {
      form.on('submit(addRole)', function(data) {
        roleServices.create(modal.normalize(data.field)).then(function(result) {
          console.log(result);
          modal.callback && modal.callback(result);
          layer.close(modal.index);
        });
        return false;
      });
    },
    open: function(item, callback) {
      modal.index = layer.open({
        type: 1,
        title: item ? '编辑' : '新增',
        area: '400px',
        content: modalView
      });

      item && form.val('form-role', item);

      modal.callback = callback;
      modal.init();
    },
    close: function() {
      layer.close(modal.index);
    },
    normalize: function(data) {
      return Object.assign({}, data, { isStatic: false, normalizedName: '', permissions: [] });
    }
  };

  return {
    create: function(callback) {
      modal.open(undefined, callback);
    },
    edit: function(item, callback) {
      modal.open(item, callback);
    },
    close: modal.close
  };
});
