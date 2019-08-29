require.config({
  baseUrl: "./"
  ,packages : [
  ]
  , paths: {
    "text" : "https://cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text",
    "skylark-ajaxfy-spa" : "../../dist/uncompressed/skylark-ajaxfy-spa-all",
     "skylark-utils-dom" : "../../node_modules/skylark-utils-dom/dist/uncompressed//skylark-utils-dom" ,
  }
  , map: {
     '*': {skylarkjs: "skylark-ajaxfy-spa"},
  }
  , shim: {
    'skylark-utils-dom': {
      deps: ['skylarkjs']
    }
  }
});

require(["skylark-ajaxfy-spa"],function(skylark) {

  require(["scripts/config","skylark-utils-dom"], function (config) {
    var app = skylark.ajaxfy.spa(config);

    window.go =  function(path) {
       app.go(path);
    };

    app.prepare().then(function(){
      app.run();
    })

  });

});

