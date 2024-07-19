/**
 * skylark-appify-spa - An Elegant  HTML5 Single Page Application Framework.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.5
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","./spa"],function(t,n){t=t.Evented.inherit({klassName:"SpaRouteController",init:function(t,n){this.content=(n=n||{}).content,this.data=n.data},getConfigData:function(t){return t?this.data[t]:this.data},perform:function(t){var n=t.type;if(this[n])return this[n].call(this,t)}});return n.RouteController=t});
//# sourceMappingURL=sourcemaps/route_controller.js.map
