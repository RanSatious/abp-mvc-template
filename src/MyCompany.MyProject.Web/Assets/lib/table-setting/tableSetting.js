define([
  'main',
  'text!/assets/lib/table-setting/tableSetting.html',
  'text!/assets/lib/table-setting/column.html',
  'css!/assets/lib/table-setting/tableSetting.css',
  'lay!form',
  'lay!element',
  'lay!laytpl'
], function(main, modalView, columnView) {
  var layer = layui.layer;
  var form = layui.form;
  var laytpl = layui.laytpl;

  var modal = {
    index: 0,
    model: {},
    current: null,
    callback: null,
    titleProp: null,
    init: function(params) {
      modal.model = params.model;
      modal.model.forEach(function(item) {
        if (item.show === undefined) {
          item.show = true;
        }
      });
      modal.callback = params.callback;
      modal.titleProp = params.titleProp || 'title';

      $('.setting-body p').click(function(e) {
        if (e.target == this) {
          modal.select($(this));
        }
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
        content: laytpl(modalView).render({
          items: params.model.map(function(item) {
            return { name: item[params.titleProp], show: item.show === undefined ? true : item.show };
          })
        })
      });
      form.render();
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

      modal.current
        .html(laytpl(columnView).render({ name: modal.model[index][modal.titleProp], show: modal.model[index].show }))
        .removeClass('active');
      modal.current = $(modal.current[0].previousElementSibling);
      modal.current
        .html(
          laytpl(columnView).render({
            name: modal.model[index - 1][modal.titleProp],
            show: modal.model[index - 1].show
          })
        )
        .addClass('active');
      form.render();

      modal.checkButton(index - 1);
    },
    down: function() {
      if (!modal.current) return;

      var index = modal.current.data('index');

      if (index == modal.model.length - 1) return;

      var temp = modal.model[index + 1];
      modal.model[index + 1] = modal.model[index];
      modal.model[index] = temp;

      modal.current.text(modal.model[index][modal.titleProp]).removeClass('active');
      modal.current = $(modal.current[0].nextElementSibling);
      modal.current.text(modal.model[index + 1][modal.titleProp]).addClass('active');

      modal.checkButton(index + 1);
    },
    save: function() {
      layer.close(modal.index);
      modal.callback && modal.callback(modal.model);
    }
  };

  return {
    open: function(options) {
      options.model = JSON.parse(JSON.stringify(options.model));
      modal.open(options);
    },
    close: modal.close
  };
});
