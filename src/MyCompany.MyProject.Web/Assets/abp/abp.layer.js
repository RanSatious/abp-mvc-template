define(['jquery', 'abp/abp.core', 'lay!layer'], function($, abp, layer) {
  /* DEFAULTS *************************************************/

  abp.libs = abp.libs || {};
  abp.libs.layer = {
    config: {
      default: {
        title: '',
        message: '',
        icon: 0,
        btnAlign: 'c',
        closeBtn: 0
      },
      info: {
        icon: 6
      },
      success: {
        icon: 1
      },
      warn: {
        icon: 0
      },
      error: {
        icon: 2
      },
      confirm: {
        icon: 3,
        title: '确认',
        buttons: ['否', '是']
      }
    }
  };

  /* MESSAGE **************************************************/

  var showMessage = function(type, option) {
    // {type, message, title}
    if (typeof option == 'string') {
      option = { message: option };
    }

    option = $.extend({}, abp.libs.layer.config['default'], abp.libs.layer.config[type], option);

    return $.Deferred(function($dfd) {
      layer.alert(option.message, option, function(index) {
        layer.close(index);
        $dfd.resolve();
      });
      document.activeElement.blur();
    });
  };

  abp.message.info = function(option) {
    return showMessage('info', option);
  };
  abp.message.success = function(option) {
    return showMessage('success', option);
  };
  abp.message.warn = function(option) {
    return showMessage('warn', option);
  };
  abp.message.error = function(option) {
    return showMessage('error', option);
  };

  abp.message.confirm = function(option) {
    // {message, title}
    if (typeof option == 'string') {
      option = { message: option };
    }

    option = $.extend({}, abp.libs.layer.config['default'], abp.libs.layer.config.confirm, option);

    return $.Deferred(function($dfd) {
      layer.confirm(
        option.message,
        option,
        function(index) {
          layer.close(index);
          $dfd.resolve(true);
        },
        function(index) {
          layer.close(index);
          $dfd.resolve(false);
        }
      );
      document.activeElement.blur();
    });
  };

  abp.notify.success = function(message, title, options) {
    layer.msg(message, {
      icon: 1,
      time: 1000
    });
  };

  abp.notify.info = function(message, title, options) {
    layer.msg(message, {
      icon: 6,
      time: 1000
    });
  };

  abp.notify.warn = function(message, title, options) {
    layer.msg(message, {
      icon: 0,
      time: 1000
    });
  };

  abp.notify.error = function(message, title, options) {
    layer.msg(message, {
      icon: 2,
      time: 1000
    });
  };
});
