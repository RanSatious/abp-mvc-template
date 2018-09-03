define([
  'main',
  'text!/assets/lib/table-setting/tableSetting.html',
  'css!/assets/lib/table-setting/tableSetting.css',
  'lay!laytpl'
], function(main, modalView) {
  var layer = layui.layer;
  var laytpl = layui.laytpl;

  var modal = {
    index: 0,
    model: {},
    current: null,
    callback: null,
    init: function(params) {
      modal.model = params.model;
      modal.callback = params.callback;

      $('.setting-body p').click(function(e) {
        modal.select($(this));
      });
      $('#btn-up').click(modal.up);
      $('#btn-down').click(modal.down);
      $('#btn-save').click(modal.save);
    },
    open: function(params) {
      modal.index = layer.open({
        type: 1,
        title: '设置',
        area: '400px',
        content: laytpl(modalView).render(params)
      });
      modal.init(params);
    },
    close: function() {
      layer.close(modal.index);
    },
    select: function(item) {
      if (modal.current) {
        modal.current.removeClass('active');
      }
      modal.current = item;
      modal.current.addClass('active');

      modal.checkButton(item.data('index'));
    },
    checkButton: function(index) {
      if (index == 0) {
        $('#btn-up')
          .addClass('layui-btn-disabled')
          .removeClass('layui-btn-normal')
          .attr('disabled', 'disabled');
      } else {
        $('#btn-up')
          .addClass('layui-btn-normal')
          .removeClass('layui-btn-disabled')
          .removeAttr('disabled');
      }

      if (index == modal.model.length - 1) {
        $('#btn-down')
          .addClass('layui-btn-disabled')
          .removeClass('layui-btn-normal')
          .attr('disabled', 'disabled');
      } else {
        $('#btn-down')
          .addClass('layui-btn-normal')
          .removeClass('layui-btn-disabled')
          .removeAttr('disabled');
      }
    },
    up: function() {
      if (!modal.current) return;

      var index = modal.current.data('index');

      if (index == 0) return;

      var temp = modal.model[index - 1];
      modal.model[index - 1] = modal.model[index];
      modal.model[index] = temp;

      modal.current.text(modal.model[index].title).removeClass('active');
      modal.current = $(modal.current[0].previousElementSibling);
      modal.current.text(modal.model[index - 1].title).addClass('active');

      modal.checkButton(index - 1);
    },
    down: function() {
      if (!modal.current) return;

      var index = modal.current.data('index');

      if (index == modal.model.length - 1) return;

      var temp = modal.model[index + 1];
      modal.model[index + 1] = modal.model[index];
      modal.model[index] = temp;

      modal.current.text(modal.model[index].title).removeClass('active');
      modal.current = $(modal.current[0].nextElementSibling);
      modal.current.text(modal.model[index + 1].title).addClass('active');

      modal.checkButton(index + 1);
    },
    save: function() {
      console.log(modal.model);
      layer.close(modal.index);
      modal.callback && modal.callback(modal.model);
    }
  };

  return {
    open: function(model, callback) {
      modal.open({
        model: JSON.parse(JSON.stringify(model)),
        callback: callback
      });
    },
    close: modal.close
  };
});
