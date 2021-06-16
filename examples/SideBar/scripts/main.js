require.config({
  baseUrl: "/examples/SideBar/"
  ,packages : [
  ]
  , paths: {
    "text" : "https://cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text",
    "skylark-appify-spa" : "../../dist/uncompressed/skylark-appify-spa",
    "skylark-appify-routers" : "../../node_modules/skylark-appify-routers/dist/uncompressed//skylark-appify-routers",
    "skylark-domx" : "../../node_modules/skylark-domx/dist/uncompressed//skylark-domx-all" ,
  }
  , map: {
     '*': {skylarkjs: "skylark-langx/skylark"},
  }
});

require(["skylark-domx"],function() {

require(["skylark-appify-routers"],function() {
  require(["skylark-langx/skylark","scripts/config","skylark-appify-spa"], function (skylark,config,spa) {
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
