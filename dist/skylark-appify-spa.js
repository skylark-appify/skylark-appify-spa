/**
 * skylark-appify-spa - An Elegant  HTML5 Single Page Application Framework.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.5
 * @link www.skylarkjs.org
 * @license MIT
 */
(function(factory,globals,define,require) {
  var isAmd = (typeof define === 'function' && define.amd),
      isCmd = (!isAmd && typeof exports !== 'undefined');

  if (!isAmd && !define) {
    var map = {};
    function absolute(relative, base) {
        if (relative[0]!==".") {
          return relative;
        }
        var stack = base.split("/"),
            parts = relative.split("/");
        stack.pop(); 
        for (var i=0; i<parts.length; i++) {
            if (parts[i] == ".")
                continue;
            if (parts[i] == "..")
                stack.pop();
            else
                stack.push(parts[i]);
        }
        return stack.join("/");
    }
    define = globals.define = function(id, deps, factory) {
        if (typeof factory == 'function') {
            map[id] = {
                factory: factory,
                deps: deps.map(function(dep){
                  return absolute(dep,id);
                }),
                resolved: false,
                exports: null
            };
            require(id);
        } else {
            map[id] = {
                factory : null,
                resolved : true,
                exports : factory
            };
        }
    };
    require = globals.require = function(id) {
        if (!map.hasOwnProperty(id)) {
            throw new Error('Module ' + id + ' has not been defined');
        }
        var module = map[id];
        if (!module.resolved) {
            var args = [];

            module.deps.forEach(function(dep){
                args.push(require(dep));
            })

            module.exports = module.factory.apply(globals, args) || null;
            module.resolved = true;
        }
        return module.exports;
    };
  }
  
  if (!define) {
     throw new Error("The module utility (ex: requirejs or skylark-utils) is not loaded!");
  }

  factory(define,require);

  if (!isAmd) {
    var skylarkjs = require("skylark-langx-ns");

    if (isCmd) {
      module.exports = skylarkjs;
    } else {
      globals.skylarkjs  = skylarkjs;
    }
  }

})(function(define,require) {

define("skylark-appify-spa/spa",["skylark-langx/skylark"],function(e){function r(e){return r.Page(e)}return e.attach("appify.spa",r)}),define("skylark-appify-spa/router",["skylark-appify-routers","./spa"],function(e,r){e=new e.Router;return r.router=e}),define("skylark-appify-spa/page",["skylark-langx/langx","./spa","./router"],function(n,i,a){var o=n.Deferred,e=n.Evented.inherit({klassName:"SpaPage",init:function(e){var t=this._plugins={},r=(e=this._config=n.mixin({plugins:{}},e,!0),n.each(e.plugins,function(e,r){t[e]=new i.Plugin(e,r)}),a.routes(e.routes),this._router=a,n.mixin({routeViewer:"body"},e.page)),r=(this._params=r,this._rvc=document.querySelector(r.routeViewer),a.on("routed",n.proxy(this,"refresh")),document.title=e.title,e.baseUrl);void 0===r&&(r=e.baseUrl=new n.URL(document.baseURI).pathname),a.baseUrl(r),e.homePath&&a.homePath(e.homePath)},baseUrl:function(){return a.baseUrl()},getConfig:function(e){return e?this._config[e]:this._config},go:function(e,r){return a.go(e,r),this},refresh:function(){var e=a.current(),r=(a.previous(),e.route.render(e));null!=r&&(n.isString(r)?this._rvc.innerHTML=r:(this._rvc.innerHTML="",this._rvc.appendChild(r)),e.route.trigger(n.createEvent("rendered",{route:e.route,content:r})))},prepare:function(){var t,e;return this._prepared?o.resolve():(e=n.map((t=this)._plugins,function(e,r){if(e.isHooked("starting"))return e.prepare()}),o.all(e).then(function(){a.trigger(n.createEvent("starting",{spa:t}));var e=n.map(a.routes(),function(e,r){if(!1===e.lazy)return e.prepare()}),r=n.map(t._plugins,function(e,r){if(!e.isHooked("starting"))return e.prepare()});return o.all(e.concat(r)).then(function(){t._prepared=!0})}))},run:function(){this._router.start(),a.trigger(n.createEvent("started",{spa:this}))}});return i.Page=e}),define("skylark-appify-spa/plugin",["skylark-langx/langx","./spa","./router"],function(o,e,s){var u=o.Deferred,r=o.Evented.inherit({klassName:"SpaPlugin",init:function(e,r){this.name=e,o.isString(r.hookers)&&(r.hookers=r.hookers.split(" ")),this._setting=r},isHooked:function(e){return-1<(this._setting.hookers||[]).indexOf(e)},prepare:function(){var r,t=new u,n=this._setting,i=n.controller,a=(this.controller,this);return require([i.type],function(e){r=a.controller=new e(i),s.on(n.hookers,{plugin:a},o.proxy(r.perform,r)),t.resolve()}),t.then(function(){var e=o.createEvent("preparing",{plugin:a,result:!0});return a.trigger(e),u.when(e.result).then(function(){a._prepared=!0})})},trigger:function(e){var r=this.controller;return r?r.perform(e):this.overrided(e)}});return e.Plugin=r}),define("skylark-appify-spa/plugin_controller",["skylark-langx/langx","./spa"],function(e,r){e=e.Evented.inherit({klassName:"SpaPluginController",init:function(e){this.plugin=e},perform:function(e){var r=e.type;if(this[r])return this[r].call(this,e)}});return r.PluginController=e}),define("skylark-appify-spa/route",["skylark-langx/langx","./spa","./router"],function(i,e,r){var a=i.Deferred,r=r.Route=r.Route.inherit({klassName:"SpaRoute",init:function(e,r){this.overrided(e,r),this.content=r.content,this.forceRefresh=r.forceRefresh,this.data=r.data;var t=this;["preparing","rendering","rendered"].forEach(function(e){i.isFunction(r[e])&&t.on(e,r[e])})},_entering:function(e){return this.forceRefresh||e.force||!this._prepared?this.prepare():this},getConfigData:function(e){return e?this.data[e]:this.data},getNamedValue:function(){return window.location.pathname.match(this.regex)},prepare:function(){var r=new a,e=this._setting,t=e.controller,n=(this.controller,this);e.content,e.contentPath;return require([t.type],function(e){n.controller=new e(t),r.resolve()}),r.then(function(){var e=i.createEvent("preparing",{route:n,result:!0});return n.trigger(e),a.when(e.result).then(function(){n._prepared=!0})})},render:function(e){e=i.createEvent("rendering",{route:this,context:e,content:this.content});return this.trigger(e),e.content},trigger:function(e){var r=this.controller;return r?r.perform(e):this.overrided(e)}});return e.Route=r}),define("skylark-appify-spa/route_controller",["skylark-langx/langx","./spa"],function(e,r){e=e.Evented.inherit({klassName:"SpaRouteController",init:function(e,r){this.content=(r=r||{}).content,this.data=r.data},getConfigData:function(e){return e?this.data[e]:this.data},perform:function(e){var r=e.type;if(this[r])return this[r].call(this,e)}});return r.RouteController=e}),define("skylark-appify-spa/main",["./spa","./page","./plugin","./plugin_controller","./route","./route_controller","./router"],function(e){return e}),define("skylark-appify-spa",["skylark-appify-spa/main"],function(e){return e});
},this,define,require);
//# sourceMappingURL=sourcemaps/skylark-appify-spa.js.map
