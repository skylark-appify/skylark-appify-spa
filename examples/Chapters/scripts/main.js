require.config({
  baseUrl: "./"
  ,packages : [
  ]
  , paths: {
	  "text" : "https://cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text",
    "skylarkjs" : "../../dist/uncompressed/skylark-spa-all",
    "skylark-utils" : "http://registry.skylarkjs.org/packages/skylark-utils/v0.9.2/uncompressed/skylark-utils"
  }
  , shim: {
    'skylark-utils': {
      deps: ['skylarkjs']
    }
  }
});
 
require(["skylarkjs","scripts/config","skylark-utils"], function (skylark,config) {
  var app = skylark.spa(config);

  window.go =  function(path) {
     app.go(path);
  };

  app.prepare().then(function(){
    app.run();
  })

});