/**
 * skylark-appify-spa - An Elegant  HTML5 Single Page Application Framework.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.5
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","./spa","./router"],function(i,e,t){var o=i.Deferred,t=t.Route=t.Route.inherit({klassName:"SpaRoute",init:function(e,t){this.overrided(e,t),this.content=t.content,this.forceRefresh=t.forceRefresh,this.data=t.data;var r=this;["preparing","rendering","rendered"].forEach(function(e){i.isFunction(t[e])&&r.on(e,t[e])})},_entering:function(e){return this.forceRefresh||e.force||!this._prepared?this.prepare():this},getConfigData:function(e){return e?this.data[e]:this.data},getNamedValue:function(){return window.location.pathname.match(this.regex)},prepare:function(){var t=new o,e=this._setting,r=e.controller,n=(this.controller,this);e.content,e.contentPath;return require([r.type],function(e){n.controller=new e(r),t.resolve()}),t.then(function(){var e=i.createEvent("preparing",{route:n,result:!0});return n.trigger(e),o.when(e.result).then(function(){n._prepared=!0})})},render:function(e){e=i.createEvent("rendering",{route:this,context:e,content:this.content});return this.trigger(e),e.content},trigger:function(e){var t=this.controller;return t?t.perform(e):this.overrided(e)}});return e.Route=t});
//# sourceMappingURL=sourcemaps/route.js.map
