# skylark-spa
An Elegant HTML5 Single Page Application Framework

## Features

- Easy to manage  
The application functions are managed by the configuration file and the framework using controller pattern , unit test and division of labor development become easier.
- [skylark-router](https://github.com/skylarkjs/skylark-router) is built-in. [skylark-router's features](https://github.com/skylarkjs/skylark-router/blob/master/README.md#features)
- Lightweight, even if allinone is only 16k(minified),6k(gzip)

## Dependences
| Project | Description |
|---------|-------------|
| [skylark-langx](https://github.com/skylarkjs/skylark-langx)  | Javascript language extension library |
| [skylark-router](https://github.com/skylarkjs/skylark-router)   | Front-end routing framework |

##  Different builds
|  | build | Description |
|---------|--------|-------------|
| full | skylark-spa-all.js | included skylark-langx and skylark-router |
| only sap | skylark-spa.js | not included skylark-langx and skylark-router|
| full （development） | uncompressed/skylark-spa-all.js | included skylark-langx and skylark-router  |
| only router （development）| uncompressed/skylark-spa.js | not included skylark-langx and skylark-router|


## Installation
There are multiple ways to install the skylark-spa library. 
- cdn  
http://registry.skylarkjs.org/packages/skylark-router/v0.9.0/skylark-spa-all.js    or  
http://registry.skylarkjs.org/packages/skylark-router/v0.9.0/uncompressed/skylark-spa-all.js 
- npm  
npm install skylark-spa --save
- bower  
bower install skylark-spa
