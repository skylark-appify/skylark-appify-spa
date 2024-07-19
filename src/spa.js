define([
    "skylark-langx/skylark"
], function(skylark) {

    var spa = function(config) {
 		return spa.Application(config);
    }


    return skylark.attach("appify.spa",spa);
});
