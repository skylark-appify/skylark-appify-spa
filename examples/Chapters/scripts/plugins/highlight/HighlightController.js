define([
	"skylarkjs"
],function(skylarkjs){
    var spa = skylarkjs.ajaxfy.spa,
        noder = skylarkjs.dom.noder,
        $ = skylarkjs.dom.query;

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
