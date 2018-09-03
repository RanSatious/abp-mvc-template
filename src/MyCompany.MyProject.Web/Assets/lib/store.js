define(['main', 'lib/utils'], function(main, utils) {
  var abp = main.abp;
  var layer = layui.layer;

  var formatKey = function(key) {
    if (!abp.session.userId) {
      utils.loginOvertime();
    }
    return 'user_' + abp.session.userId + '_' + key;
  };

  var store = {
    getItem: function(key) {
      key = formatKey(key);
      var item = localStorage.getItem(key);
      try {
        return JSON.parse(item);
      } catch (error) {
        return item;
      }
    },
    setItem: function(key, value) {
      key = formatKey(key);
      if (typeof value == 'object') {
        localStorage.setItem(key, JSON.stringify(value));
      } else {
        localStorage.setItem(key, value);
      }
    },
    removeItem: function(key) {
      key = formatKey(key);
      localStorage.removeItem(key);
    },
    clear: function() {
      localStorage.clear();
    }
  };

  return store;
});
