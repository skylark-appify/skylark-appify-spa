# Architecure
![アーキテクチャ](https://github.com/skylarkjs/skylark-spa/blob/master/docs/architecure.jpg "アーキテクチャ")

## Application elements
The elements of skylark application are as follows.

### Framework-side elements

1. Application  
Application is the type used for a skylark single page application, and the framework automatically declares an Application variable as the instance of the application.  
The application type is exposed on spa.Application.
1. Page  
Page is used to encapsulate the host HTML.  
The page type is exposed on spa.Page.
1. Route  
Route represents a viewport of the application page, and that is identified and navigated through a path.  
The route type is exposed on sap.Route.
1. Plugin  
Plugin provides a mechanism to implement common logic not belonging to a single route view ,such as navigation menu processing. 
The plugin type is exposed on spa.Plugin.  
Only when necessary, developper can inherit these types to implement new type to extend the framework functionality.

### Development-side elements
1. index.html  
index.html is the host HTML where the application runs, and the name can be freely defined.  
The index.html can be an empty HTML file, the developer can also directly define the basic layout of the application in this file.
1. Controller  
Controllers are the active parts of a skylark single page application. They define how the user can interact with the skylark application.  
   1. Route Controller  
Each route consists of the route config and exactly one route controller. route events are sent to the corresponding routing controller for processing. 
route events are follows :
      * entering  
The route will be entered
      * rendering  
The route needs to render the view
      * entered  
The route has been entered
      * exiting  
The route will be exited
      * exited  
The route has been exited
   1. Plugin Controller  
Each plugin consists of the plugin config and exactly one route controller. global events are sent to the corresponding routing controller for processing. 
Global events are follows :
      * starting  
The application is starting.
      * started  
The application is started.
      * routing  
The application is changing current route.
      * routed  
The application has changed current route.
1. config.js  
The config.js configuration file defines the entire composition of a skylark application, such as:
   * name and title
   * base URL
   * route define
      * pathto
      * controller
   * plugin define
      * hookers
      * controller

## Front controller pattern  
The front controller design pattern means that all requests or event in an application will be handled by a single handler and then dispatched to the appropriate handler for that type of request or event.    
Skylark application follows front controller design pattern, and in the framework the Application type serves as the front-end controller.   
The events that are processed in the Application object are only associated with route and other application-level events, not including the mouse, keyboard and other UI events.  
UI events belong to the implemation scope of the route view, Developers can integrate jquery-ui, bootstrap, backbone and other UI framework to develop skylark route view
