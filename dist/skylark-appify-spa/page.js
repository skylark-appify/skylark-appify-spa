/**
 * skylark-appify-spa - An Elegant  HTML5 Single Page Application Framework.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.5
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","./spa","./router"],function(t,e,n){t.Deferred;var r=t.Evented.inherit({klassName:"SpaPage",init:function(e){e=t.mixin({routeViewer:"body"},e),this._params=e,this._rvc=document.querySelector(e.routeViewer),(this._router=n).on("routed",t.proxy(this,"refresh"))},prepare:function(){},refresh:function(){var e=n.current(),r=(n.previous(),e.route.render(e));null!=r&&(t.isString(r)?this._rvc.innerHTML=r:(this._rvc.innerHTML="",this._rvc.appendChild(r)),e.route.trigger(t.createEvent("rendered",{route:e.route,content:r})))}});return e.Page=r});
//# sourceMappingURL=sourcemaps/page.js.map
