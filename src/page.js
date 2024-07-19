define([
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
