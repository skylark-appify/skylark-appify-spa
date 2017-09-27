# Overview
## what is a single page application 
A single-page application (SPA) is a web application or web site that fits on a single web page.the application runs within an html document, and different views are rendered within same html document.  

In a SPA, either all necessary code – HTML, JavaScript, and CSS – is retrieved with a single page load, or the appropriate resources are dynamically loaded and added to the page as necessary, usually in response to user actions. The page does not reload at any point in the process, nor does control transfer to another page, although the location hash or the HTML5 History API can be used to provide the perception and navigability of separate logical pages in the application.

## Lifecycle of a Single Page Application 
Lifecycle of a Single Page Application is follows:
1. An appliation is identified by a base url  
Base URL is the part before “#” if location hash is used, or root part of url if html5 api is used
1. Application launches when on entering this url in address bar.
1. The part after base url changes with views.
1. When base url part changes, application is destroyed.

## Routes and Views 
In context of a single page app, route is the part after “#!”(if location hash is used) or base url (if html5 api is used) in address bar. 
Each route represents a view.

- “/”   
represents home/default view
- “/section1”   
show section view
- “/view1?a=1&b=2”   
show view1, with argument {a: 1, b:2}

## Cross Origin Requests (CORS or Cross origin resource sharing)
Interaction with the single page application often involves dynamic communication with the web server behind the scenes, This time Cross Origin Requests(CORS) may be used.
CORS is an ajax request to a server, other than one that served the page.browsers block such requests, unless response headers allows so.

“Access-Control-Allow-Origin” value in response header, determines pages from which origin(s) can access the response,if it doesn't include our current location origin, browser blocks access the response.
