define([
    "skylarkjs",
	"text!./templates/home.html"
],function(skylarkjs,tpl){
    var spa = skylarkjs.ajaxfy.spa,
        noder = skylarkjs.dom.noder,
        $ = skylarkjs.dom.query;

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
