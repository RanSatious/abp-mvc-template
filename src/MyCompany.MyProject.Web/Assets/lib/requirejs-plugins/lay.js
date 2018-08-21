define(function() {
  return {
    load: function(name, req, onLoad, config) {
      layui.use(name, function(mod) {
        onLoad(mod);
      });
    }
  };
});
