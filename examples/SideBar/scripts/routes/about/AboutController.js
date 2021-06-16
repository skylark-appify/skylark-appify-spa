define([
	"skylark-appify-spa/spa",
    "skylark-langx/langx",
	"skylark-domx/query",
	"text!./templates/about.html"
],function(spa,langx,$,tpl){

	return spa.RouteController.inherit({
        klassName: "AboutController",

        rendering(e) {
            e.content =  langx.substitute(tpl,{
                 name :  e.route.data.name
            });
        },

    	exited(e) {
            console.log('good bye About');
    	}
	})

});
