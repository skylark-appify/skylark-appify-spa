/**
 * skylark-appify-spa - An Elegant  HTML5 Single Page Application Framework.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.5
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","./spa","./router"],function(n,i,a){var o=n.Deferred,e=n.Evented.inherit({klassName:"SpaPage",init:function(e){var t=this._plugins={},r=(e=this._config=n.mixin({plugins:{}},e,!0),n.each(e.plugins,function(e,r){t[e]=new i.Plugin(e,r)}),a.routes(e.routes),this._router=a,n.mixin({routeViewer:"body"},e.page)),r=(this._params=r,this._rvc=document.querySelector(r.routeViewer),a.on("routed",n.proxy(this,"refresh")),document.title=e.title,e.baseUrl);void 0===r&&(r=e.baseUrl=new n.URL(document.baseURI).pathname),a.baseUrl(r),e.homePath&&a.homePath(e.homePath)},baseUrl:function(){return a.baseUrl()},getConfig:function(e){return e?this._config[e]:this._config},go:function(e,r){return a.go(e,r),this},refresh:function(){var e=a.current(),r=(a.previous(),e.route.render(e));null!=r&&(n.isString(r)?this._rvc.innerHTML=r:(this._rvc.innerHTML="",this._rvc.appendChild(r)),e.route.trigger(n.createEvent("rendered",{route:e.route,content:r})))},prepare:function(){var t,e;return this._prepared?o.resolve():(e=n.map((t=this)._plugins,function(e,r){if(e.isHooked("starting"))return e.prepare()}),o.all(e).then(function(){a.trigger(n.createEvent("starting",{spa:t}));var e=n.map(a.routes(),function(e,r){if(!1===e.lazy)return e.prepare()}),r=n.map(t._plugins,function(e,r){if(!e.isHooked("starting"))return e.prepare()});return o.all(e.concat(r)).then(function(){t._prepared=!0})}))},run:function(){this._router.start(),a.trigger(n.createEvent("started",{spa:this}))}});return i.Page=e});
//# sourceMappingURL=sourcemaps/page.js.map
