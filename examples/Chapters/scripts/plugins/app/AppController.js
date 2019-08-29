define([
    "skylarkjs"
], function(skylarkjs) {
    var spa = skylarkjs.ajaxfy.spa,
    	noder = skylarkjs.dom.noder,
        $ = skylarkjs.dom.query;

    return spa.PluginController.inherit({
        klassName: "AppController",
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

        starting: function(e) {
            this._showProcessing();
        },
        started: function(e) {
            this._hideProcessing();
        }
    });
});
