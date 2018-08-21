var appPath = appPath || '/';
var timeStamp = new Date().getTime();
var console = console || {
  log: function() {}
};

requirejs.config({
  baseUrl: '/assets',
  paths: {
    // core libary
    jquery: 'node_modules/jquery/dist/jquery.min',

    // requireJs plugins
    depend: 'lib/requirejs-plugins/depend',
    text: 'lib/requirejs-plugins/text',
    lay: 'lib/requirejs-plugins/lay',

    // abp dynamic script
    apiService: '/api/AbpServiceProxies/GetAll?t=' + timeStamp,
    scriptService: '/AbpScripts/GetScripts?t=' + timeStamp,

    // javascript shim
    es6: 'node_modules/requirejs-babel/es6',
    babel: 'node_modules/requirejs-babel/babel-5.8.34.min',
    polyfill: 'node_modules/babel-polyfill/dist/polyfill.min'
  },
  map: {
    '*': {
      css: 'lib/require-css/css' // or whatever the path to require-css is
    }
  },
  urlArgs: 'v=' + timeStamp
});
requirejs(['polyfill'], function() {
  requirejs([_jsPath || 'app/main']);
});
