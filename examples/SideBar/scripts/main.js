require.config({
  baseUrl: "./"
  ,packages : [
     { name: "skylark-langx", location: "http://registry.skylarkjs.org/packages/skylark-langx/v0.9.0/uncompressed/skylark-langx" },
     { name: "skylark-utils", location: "http://registry.skylarkjs.org/packages/skylark-utils/v0.9.2/uncompressed/skylark-utils" },
     { name: "skylark-router", location: "http://registry.skylarkjs.org/packages/skylark-router/v0.9.2/uncompressed/skylark-router"},
     { name: "skylark-spa", location: "../../dist/uncompressed/skylark-spa" }
  ]
  , paths: {
	"text" : "https://cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text"
  }
});
 
require(["skylark-spa/spa","scripts/config"], function (spa,config) {
  var app = spa(config);
  window.go =  function(path) {
     app.go(path);
  };
  
  app.prepare().then(function(){
    app.run();
  })

});