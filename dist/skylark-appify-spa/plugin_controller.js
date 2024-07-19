/**
 * skylark-appify-spa - An Elegant  HTML5 Single Page Application Framework.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.5
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","./spa"],function(n,i){n=n.Evented.inherit({klassName:"SpaPluginController",init:function(n){this.plugin=n},perform:function(n){var i=n.type;if(this[i])return this[i].call(this,n)}});return i.PluginController=n});
//# sourceMappingURL=sourcemaps/plugin_controller.js.map
