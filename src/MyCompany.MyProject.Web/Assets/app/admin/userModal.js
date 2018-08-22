define(['main', 'text!/Views/Admin/_userModal.html', 'lay!form', 'lay!layer', 'lay!laytpl'], function(main, modalView) {
  console.log('role modal loaded');
  var form = layui.form;
  var layer = layui.layer;
  var laytpl = layui.laytpl;

  var userService = abp.services.app.user;

  var modal = {
    index: 0,
    callback: null,
    init: function() {
      form.on('submit(addUser)', function(data) {
        userService.create(modal.normalize(data.field)).then(function(result) {
          console.log(result);
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
    open: function(option, callback) {
      console.log(option);
      modal.index = layer.open({
        type: 1,
        title: option.item ? '编辑' : '新增',
        area: '400px',
        content: laytpl(modalView).render(option || {})
      });

      option.item && form.val('form-user', Object.assign({}, option.item));

      modal.callback = callback;
      modal.init();
    },
    close: function() {
      layer.close(modal.index);
    },
    normalize: function(data) {
      return Object.assign({}, data, { isActive: true, surname: data.name, roleNames: [] });
    }
  };

  return {
    create: function(option, callback) {
      modal.open(Object.assign({}, option, { item: {} }), callback);
    },
    edit: function(option, callback) {
      modal.open(option, callback);
    },
    close: modal.close
  };
});
