define([
],function(){
	var config = {
	    "name" : "chaptersApp",  // default:app
	    "title": "A exmaple with navbar and a welcome view and three chapter views",

	    "page" : {
			"routeViewer" : "#yield"
		},
	    "plugins" : {
		    "app": {
		      "hookers": "starting started",
		      "controller": {
		        "type": "scripts/plugins/app/AppController"
		      }
		    },
		    "highlight": {
		      "hookers": "routing routed",
		      "controller": {
		        "type": "scripts/plugins/highlight/HighlightController"
		      }
		    }
	    },
	    "routes" : {
	      "home": {
	          "pathto" : "/",
	          "controller" : {
	          	"type" : "scripts/routes/home/HomeController"
	          }
	      },
	      "chapter": {
	          "pathto" : "/chapter/:id",
	          "controller" : {
	          	"type" : "scripts/routes/chapter/ChapterController"
	          }
	      }
	    }
	};

	return config;
});
