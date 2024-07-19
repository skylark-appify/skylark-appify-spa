define([
    "skylark-langx/skylark"
], function(skylark) {

    var spa = function(config) {
 		return spa.Page(config);
    }


    return skylark.attach("appify.spa",spa);
});
