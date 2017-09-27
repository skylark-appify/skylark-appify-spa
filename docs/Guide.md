# Guide
Take “Chapters” as an example, let's explain how to develop a skylark single page application. 
The application contains a welcome view and three chapter views, which can be switched between different views by the navigation menu at the top of the web page.

## decide Folder structure
First, you should decide the folder structure of the application, for example：

```javascript
├── assets
│   ├── images
│   └── stylesheets
├── index.html
├── lib
│   ├── skylark
│   └── skylarkx
└── scripts
    ├── config
    │   └── config.js
    ├── helpers
    ├── main.js
    ├── plugins
    │   └── navbar
    │       └── navbar.js
    └── routes
        ├── home.html
        └── home.js
```
## configure the applicattion
You need to configure the configuration file for the application.

config.js
```javascript
define([],function(){
    var config = {
        "name" : "chaptersApp",  // default:app
        "title": "A exmaple with navbar and a welcome view and three chapter views",

        "page" : {
            "routeViewer" : "#yield"
        },
        "plugins" : {
          "highlight" : {
              hookers: "routed",
              controller : {
                type  : "scripts/plugins/highlight/HighlightController"
              },
              priority : "normal"
          }
        },
        "routes" : {
          "home": {
              pathto : "/",
              controller : {
                type : "scripts/routes/home/HomeController"
              }
          },
          "chapter": {
              pathto : "/chapter/:id",
              controller : {
                type : "scripts/routes/chapter/ChapterController"
              }
          }
        }
    };

    return config;
});
```
## create layout html
create the host html file, and define the base layout for the application.

index.html

```html
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>spa</title>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.3/require.min.js" data-main="./scripts/main.js"></script>

    <link rel="stylesheet" href="./assets/css/main.css">
</head>

<body>

<div id="chapter">
    <nav>
        <a href="javascript:go('/')">Home</a>
        <a href="javascript:go('/chapter/1')">Chapter 1</a>
        <a href="javascript:go('/chapter/2')">Chapter 2</a>
        <a href="javascript:go('/chapter/3')">Chapter 3</a>
    </nav>
    <div id="yield">
    </div>
    <footer>
        A skylark single page application example, the application contains a welcome screen and three chapter views, which can be switched between different views  by the navigation menu at the top of the web page.
    </footer>
</div>

</body>
</html>
```

coding startup script
You needs to create startup script for the application.

main.js
```javascript
require.config({
    baseUrl: "./",
    packages: [
        { name: "skylark", location: "../../../src/skylark" }
    ],
    paths: {
        "text": "https://cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text"
    }
});
require([
    "skylark/spa",
    "scripts/config"
], function(spa, config) {
    var app = spa(config);
    window.go = function(path) {
        app.go(path);
    };
    app.prepare().then(function() {
        app.run();
    });
});
```

## coding route controller
You need to create a controller class for each route(view).  
The following plugin generates a different view rendering based on the path parameters.

ChapterController.js
```javascript
define([
    "skylark/spa",
    "skylark/query",
    "text!./templates/chapter1.html",
    "text!./templates/chapter2.html",
    "text!./templates/chapter3.html"
], function(spa, $, tpl1, tpl2, tpl3) {
    return spa.RouteController.inherit({
        klassName: "ChapterController",
        prepare: function() {
            //return this.overrided();
        },
        rendering: function(e) {
            var html;
            switch (e.context.params.id) {
                case "1":
                    html = tpl1;
                    break;
                case "2":
                    html = tpl2;
                    break;
                case "3":
                    html = tpl3;
                    break;
                default:
                    html = "";
                    break;
            }
            e.content = html;
        },
        exiting: function(e) {
            var field = $('[name="field"]').val();
            if (field) {
                var ret = confirm('Are you sure you want to quit this chapter ?');
                if (!ret) {
                    e.result = false;
                }
            }
        }
    });
});
```

## coding plugin controller
If you have a plugin, you need to create a plugin controller.  
The following plugin implements the function that automatically highlights the menu corresponding to the current view when the view changes.

HighlightController

```javascript
define([
    "skylark/spa",
    "skylark/query"
], function(spa, $, tpl) {
    return spa.PluginController.inherit({
        klassName: "HighlightController",

        prepare: function() {},

        routed: function(e) {
            var links = $("a.active");
            links.removeClass("active");
            links = $("a[href*=\"'" + e.current.path + "'\"]");
            links.addClass("active");
            links[0].focus();
        }
    });
});
```
