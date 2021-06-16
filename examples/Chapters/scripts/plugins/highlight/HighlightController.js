define([
	"skylarkjs"
],function(skylarkjs){
    var spa = skylarkjs.appify.spa,
        noder = skylarkjs.domx.noder,
        $ = skylarkjs.domx.query;

	return spa.PluginController.inherit({
        klassName: "HighlightController",

        routing: function(e) {
        },
        routed: function (e) {
            var links = $("a.active");

            links.removeClass("active");

            links = $("a[href*=\"'" + e.current.path + "'\"]");
            links.addClass("active");
            links[0].focus();
        }
	})

});
