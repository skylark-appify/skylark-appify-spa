define([
	"skylarkjs"
],function(skylark){
    var spa = skylark.spa,
        noder = skylark.noder,
        $ = skylark.query;

	return spa.PluginController.inherit({
        klassName: "HighlightController",

        _showProcessing : function() {
            if (!this._throbber) {
                this._throbber = noder.throb(document.body);                
            }

        },
        _hideProcessing : function() {
            if (this._throbber) {
                this._throbber.remove();
                this._throbber = null;               
            }
        },

        starting(e) {
            this._showProcessing();
        },
        started(e) {
            this._hideProcessing();
        },
        routing(e) {
            this._showProcessing();
        },
        routed (e) {
            var links = $("a.active");

            links.removeClass("active");

            links = $("a[href*=\"'" + e.current.path + "'\"]");
            links.addClass("active");
            links[0].focus();
            this._hideProcessing();
        }
	})

});
