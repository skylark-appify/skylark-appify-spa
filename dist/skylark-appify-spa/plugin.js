/**
 * skylark-appify-spa - An Elegant  HTML5 Single Page Application Framework.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.5
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","./spa","./router"],function(s,r,u){var l=s.Deferred,e=s.Evented.inherit({klassName:"SpaPlugin",init:function(r,e){this.name=r,s.isString(e.hookers)&&(e.hookers=e.hookers.split(" ")),this._setting=e},isHooked:function(r){return-1<(this._setting.hookers||[]).indexOf(r)},prepare:function(){var e,n=new l,t=this._setting,i=t.controller,o=(this.controller,this);return require([i.type],function(r){e=o.controller=new r(i),u.on(t.hookers,{plugin:o},s.proxy(e.perform,e)),n.resolve()}),n.then(function(){var r=s.createEvent("preparing",{plugin:o,result:!0});return o.trigger(r),l.when(r.result).then(function(){o._prepared=!0})})},trigger:function(r){var e=this.controller;return e?e.perform(r):this.overrided(r)}});return r.Plugin=e});
//# sourceMappingURL=sourcemaps/plugin.js.map
