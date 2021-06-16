define([
    "skylarkjs"
], function(skylarkjs) {
    var spa = skylarkjs.appify.spa,
    	fx = skylarkjs.domx.fx,
        $ = skylarkjs.domx.query;

    return spa.PluginController.inherit({
        klassName: "AppController",
        _showProcessing : function() {
            if (!this._throbber) {
                this._throbber = fx.throb(document.body);                
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
