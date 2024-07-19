define([
    "skylark-langx/langx",
    "./spa"
], function(langx, spa) {

    var PluginController = langx.Evented.inherit({
        klassName: "SpaPluginController",

        init: function(plugin) {
            this.plugin = plugin;
        },

        perform: function(e) {
            var eventName = e.type;
            if (this[eventName]) {
                return this[eventName].call(this, e);
            }

        }
    });

    return spa.PluginController = PluginController;
});
