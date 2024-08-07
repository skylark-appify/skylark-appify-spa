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

define('skylark-appify-spa/spa',[
    "skylark-langx/skylark"
], function(skylark) {

    var spa = function(config) {
 		return spa.Page(config);
    }


    return skylark.attach("appify.spa",spa);
});

define('skylark-appify-spa/router',[
    "skylark-appify-routers",
    "./spa"
], function(routers,spa) {
    var router = new routers.Router();

    return spa.router = router;
});

define('skylark-appify-spa/page',[
    "skylark-langx/langx",
    "./spa",
    "./router"
], function(langx, spa,router) {
    var Deferred = langx.Deferred;

    var Page = langx.Evented.inherit({
        klassName: "SpaPage",

        init: function(config) {

            var plugins = this._plugins = {};

            config = this._config = langx.mixin({
                plugins: {}
            }, config, true);

            langx.each(config.plugins, function(pluginName, setting) {
                plugins[pluginName] = new spa.Plugin(pluginName, setting);
            });

            router.routes(config.routes);

            this._router = router;

            ///this._page = new spa.Page(config.page);
            var params = langx.mixin({
                "routeViewer": "body"
            }, config.page);

            this._params = params;
            this._rvc = document.querySelector(params.routeViewer);
            router.on("routed", langx.proxy(this, "refresh"));

            document.title = config.title;
            var baseUrl = config.baseUrl;
            if (baseUrl === undefined) {
                baseUrl = config.baseUrl = (new langx.URL(document.baseURI)).pathname;
            }
            router.baseUrl(baseUrl);

            if (config.homePath) {
                router.homePath(config.homePath);
            }


        },

        baseUrl : function() {
            return router.baseUrl();
        },

        getConfig: function(key) {
            return key ? this._config[key] : this._config;
        },

        go: function(path, force) {
            router.go(path, force);
            return this;
        },


        //Refreshes the route
        refresh: function() {
            var curCtx = router.current(),
                prevCtx = router.previous();
            var content = curCtx.route.render(curCtx);
            if (content===undefined || content===null) {
                return;
            }
            if (langx.isString(content)) {
                this._rvc.innerHTML = content;
            } else {
                this._rvc.innerHTML = "";
                this._rvc.appendChild(content);
            }
            curCtx.route.trigger(langx.createEvent("rendered", {
                route: curCtx.route,
                content: content
            }));
        },

        prepare: function() {

            if (this._prepared) {
                return Deferred.resolve();
            }
            var self = this;

            var promises0 = langx.map(this._plugins, function(plugin, name) {
                if (plugin.isHooked("starting")) {
                    return plugin.prepare();
                }
            });

            return Deferred.all(promises0).then(function() {
                router.trigger(langx.createEvent("starting", {
                    spa: self
                }));
                var promises1 = langx.map(router.routes(), function(route, name) {
                        if (route.lazy === false) {
                            return route.prepare();
                        }
                    }),
                    promises2 = langx.map(self._plugins, function(plugin, name) {
                        if (!plugin.isHooked("starting")) {
                            return plugin.prepare();
                        }
                    });


                return Deferred.all(promises1.concat(promises2)).then(function() {
                    self._prepared = true;
                });
            });
        },

        run: function() {
            this._router.start();
            router.trigger(langx.createEvent("started", {
                spa: this
            }));
        }
    });

    return spa.Page = Page;
});

define('skylark-appify-spa/plugin',[
    "skylark-langx/langx",
    "./spa",
    "./router"
], function(langx, spa, router) {
    var Deferred = langx.Deferred;

    var Plugin = langx.Evented.inherit({
        klassName: "SpaPlugin",

        init: function(name, setting) {
            this.name = name;

            if (langx.isString(setting.hookers)) {
                setting.hookers = setting.hookers.split(" ");
            }
            this._setting = setting;
        },

        isHooked: function(eventName) {
            var hookers = this._setting.hookers || [];
            return hookers.indexOf(eventName) > -1;
        },

        prepare: function() {
            var d = new Deferred(),
                setting = this._setting,
                controllerSetting = setting.controller,
                controller = this.controller,
                self = this;
            require([controllerSetting.type], function(type) {
                controller = self.controller = new type(controllerSetting);
                router.on(setting.hookers, {
                    plugin: self
                }, langx.proxy(controller.perform, controller));
                d.resolve();
            });
            return d.then(function() {
                var e = langx.createEvent("preparing", {
                    plugin: self,
                    result: true
                });
                self.trigger(e);
                return Deferred.when(e.result).then(function() {
                    self._prepared = true;
                });
            });
        },

        trigger: function(e) {
            var controller = this.controller;
            if (controller) {
                return controller.perform(e);
            } else {
                return this.overrided(e);
            }
        }
    });

    return spa.Plugin = Plugin;
});

define('skylark-appify-spa/plugin_controller',[
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

define('skylark-appify-spa/route',[
    "skylark-langx/langx",
    "./spa",
    "./router"
], function(langx, spa,router) {
    var Deferred = langx.Deferred;

    var Route = router.Route = router.Route.inherit({
        klassName: "SpaRoute",

        init: function(name, setting) {
            this.overrided(name, setting);
            this.content = setting.content;
            this.forceRefresh = setting.forceRefresh;
            this.data = setting.data;
            //this.lazy = !!setting.lazy;
            var self = this;
            ["preparing", "rendering", "rendered"].forEach(function(eventName) {
                if (langx.isFunction(setting[eventName])) {
                    self.on(eventName, setting[eventName]);
                }
            });
        },

        _entering: function(ctx) {
            if (this.forceRefresh || ctx.force || !this._prepared) {
                return this.prepare();
            }
            return this;
        },

        getConfigData: function(key) {
            return key ? this.data[key] : this.data;
        },

        getNamedValue: function() {
            return window.location.pathname.match(this.regex);
        },

        prepare: function() {
            var d = new Deferred(),
                setting = this._setting,
                controllerSetting = setting.controller,
                controller = this.controller,

                self = this,
                content = setting.content,
                contentPath = setting.contentPath;

            require([controllerSetting.type], function(type) {
                controller = self.controller = new type(controllerSetting);
                d.resolve();
            });

            return d.then(function() {
                var e = langx.createEvent("preparing", {
                    route: self,
                    result: true
                });
                self.trigger(e);
                return Deferred.when(e.result).then(function() {
                    self._prepared = true;
                });
            });
        },

        render: function(ctx) {
            var e = langx.createEvent("rendering", {
                route: this,
                context: ctx,
                content: this.content
            });
            this.trigger(e);
            return e.content;
        },

        trigger: function(e) {
            var controller = this.controller;
            if (controller) {
                return controller.perform(e);
            } else {
                return this.overrided(e);
            }
        }
    });

    return spa.Route = Route;;
});

define('skylark-appify-spa/route_controller',[
    "skylark-langx/langx",
    "./spa"
], function(langx, spa) {


    var RouteController = langx.Evented.inherit({
        klassName: "SpaRouteController",

        init: function(route, setting) {
            setting = setting || {};
            this.content = setting.content;
            this.data = setting.data;
        },

        getConfigData: function(key) {
            return key ? this.data[key] : this.data;
        },

        perform: function(e) {
            var eventName = e.type;
            if (this[eventName]) {
                return this[eventName].call(this, e);
            }

        }
    });



    return spa.RouteController = RouteController;
});

define('skylark-appify-spa/main',[
    "./spa",
    "./page",
    "./plugin",
    "./plugin_controller",
    "./route",
    "./route_controller",
    "./router"
], function(spa) {
    return spa;
});

define('skylark-appify-spa', ['skylark-appify-spa/main'], function (main) { return main; });


},this,define,require);
//# sourceMappingURL=sourcemaps/skylark-appify-spa.js.map
