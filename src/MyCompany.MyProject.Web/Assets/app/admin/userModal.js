define(['main', 'text!/Views/Admin/_userModal.html', 'lay!form', 'lay!layer', 'lay!laytpl'], function(main, modalView) {
  console.log('role modal loaded');
  var form = layui.form;
  var layer = layui.layer;
  var laytpl = layui.laytpl;

  var userService = abp.services.app.user;

  var modal = {
    index: 0,
    isEdit: false,
    model: {},
    callback: null,
    roles: null,
    init: function(params) {
      modal.model = params.model;
      modal.callback = params.callback;
      modal.roles = params.roles;

      form.val('form-user', modal.model);

      form.on('submit(addUser)', function(data) {
        var action = modal.isEdit ? userService.update : userService.create;
        action(modal.normalize(data.field)).then(function(result) {
          modal.callback && modal.callback(result);
          layer.close(modal.index);
        });
        return false;
      });

      form.verify({
        confirm: function(value, item) {
          // bad way
          if (value != $('input[name=password]').val()) {
            return '密码不一致';
          }
        }
      });
    },
    open: function(params) {
      modal.index = layer.open({
        type: 1,
        title: modal.isEdit ? '编辑' : '新增',
        area: '400px',
        content: laytpl(modalView).render(params)
      });

      modal.init(params);
    },
    close: function() {
      layer.close(modal.index);
    },
    normalize: function(data) {
      return Object.assign({ isActive: true, surname: data.name, roleNames: [] }, modal.model, data);
    }
  };

  return {
    create: function(params) {
      params.model = {};
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
