/**
 * skylark-appify-spa - An Elegant  HTML5 Single Page Application Framework.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.5
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","./spa","./router"],function(r,i,a){var o=r.Deferred,t=r.Evented.inherit({klassName:"SpaApplication",init:function(t){var n=this._plugins={},e=(t=this._config=r.mixin({plugins:{}},t,!0),r.each(t.plugins,function(t,e){n[t]=new i.Plugin(t,e)}),a.routes(t.routes),this._router=a,this._page=new i.Page(t.page),document.title=t.title,t.baseUrl);void 0===e&&(e=t.baseUrl=new r.URL(document.baseURI).pathname),a.baseUrl(e),t.homePath&&a.homePath(t.homePath)},baseUrl:function(){return a.baseUrl()},getConfig:function(t){return t?this._config[t]:this._config},go:function(t,e){return a.go(t,e),this},page:function(){return this._page},prepare:function(){var n,t;return this._prepared?o.resolve():(t=r.map((n=this)._plugins,function(t,e){if(t.isHooked("starting"))return t.prepare()}),o.all(t).then(function(){a.trigger(r.createEvent("starting",{spa:n}));var t=r.map(a.routes(),function(t,e){if(!1===t.lazy)return t.prepare()}),e=r.map(n._plugins,function(t,e){if(!t.isHooked("starting"))return t.prepare()});return o.all(t.concat(e)).then(function(){n._prepared=!0})}))},run:function(){this._router.start(),a.trigger(r.createEvent("started",{spa:this}))}});return i.Application=t});
//# sourceMappingURL=sourcemaps/application.js.map
