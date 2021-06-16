define([
    "skylarkjs",
	"text!./templates/home.html"
],function(skylarkjs,tpl){
    var spa = skylarkjs.appify.spa,
        noder = skylarkjs.domx.noder,
        $ = skylarkjs.domx.query;

	return spa.RouteController.inherit({
        klassName: "HomeController",

        rendering:function(e) {
            e.content = tpl;
        },

    	exited:function(e) {
            console.log('good bye Home');
    	}
	})

});
