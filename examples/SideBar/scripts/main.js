require.config({
  baseUrl: "/examples/SideBar/"
  ,packages : [
  ]
  , paths: {
    "text" : "https://cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text",
    "skylark-ajaxify-spa" : "../../dist/uncompressed/skylark-ajaxify-spa",
    "skylark-ajaxify-routers" : "../../node_modules/skylark-ajaxify-routers/dist/uncompressed//skylark-ajaxify-routers",
    "skylark-domx" : "../../node_modules/skylark-domx/dist/uncompressed//skylark-domx-all" ,
  }
  , map: {
     '*': {skylarkjs: "skylark-langx/skylark"},
  }
});

require(["skylark-domx"],function() {

require(["skylark-ajaxify-routers"],function() {
  require(["skylark-langx/skylark","scripts/config","skylark-ajaxify-spa"], function (skylark,config,spa) {
    var app = spa(config);

    window.go =  function(path) {
       app.go(path);
    };

    app.prepare().then(function(){
      app.run();
    })

  });
 });

 });
