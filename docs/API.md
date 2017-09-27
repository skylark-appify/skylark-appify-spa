# API
This module contains some types and methods related to single page application.

## spa()
### spa(config)  
Create the application instance and init application with the specified config when starting application

**Return value**  
the application instance

**Parameter**  
- config  
TYPE: PlainObject  
the application configuration defines the entire composition of a skylark application, such as:
  * name and title
  * base URL
  * route define
    * pathto
    * controller
  * plugin define
    * hookers
    * controller

### spa()  
Get the global Application instance.

**Return value**  
the application instance

## .Application  
spa.Application  
Application is the type used for a skylark single page application, and the framework automatically declares an Application variable as the instance of the application.  
if necessary, developper could create a new type inherited from this build-in type and set to spa.Application before calling spa(config), the application instance of custom type will be created.

### Application.prototype.go()
spa().go(path)

### Application.prototype.page()
spa().page()  
Get the Page instance of the application.

### Application.prototype.prepare()
spa().prepare()  
Perform preparation process before　the application becomes runnable.

**Return value**  
a promise object

### Application.prototype.run()
spa().run()  
Let the application go into the running state, the router function will be started.

## .Page
spa.Page  
Page is the type used to encapsulate the host HTML and the framework automatically declares an Page instance in initing application.  
the Page instance can be obtained by page() method of the applicaiton instance.  
if necessary, developper could create a new type inherited from this build-in type and set to spa.Page before calling spa(config), the Page instance of custom type will be created.

### Page.prototype.refresh()
.refresh()  
After the current path of the application is transformed, the method is invoked internally, displaying the view of the current path.

## .Plugin
spa.Plugin  
Plugin provides a mechanism to implement common logic not belonging to a single route view ,such as navigation menu processing.

### Plugin.prototype.prepare()
.prepare()  
Perform preparation process such as setuping PluginController before　the plugin becomes runnable.  
while preparing application, the method is invoked internally,

**Return value**  
a promise object

## .PluginController
spa.PluginController  
PluginController is a type used to describe the interface that should be implemented by custom plugin controller.

### PluginController.prototype.perform()
.perform(event)  
the method is called by the framework for notifing global event to custom application program.  

**Parameter**  
- event   
TYPE: Event   
the event object

## .Route
spa.Route  
Route represents a viewport of the application page, and that is identified and navigated through a path.

### Route.prototype.prepare()
.prepare()  
Perform preparation process such as setuping RouteController before　the route becomes runnable.  
Normally, this method is delayed until the route needs to be displayed , but if the route is configured to forbid lazy loading (lazy = false) in the configuration, it is called when the application is initialized.  

**Return value**  
a promise object

## .RouteController
spa.RouteController  
RouteController is a type used to describe the interface that should be implemented by custom route controller.

### RouteController.prototype.perform()
.perform(event)  
the method is called by the framework for notifing route event to custom application program.  
**Parameter**  
- event   
TYPE: Event   
the event object
