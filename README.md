# skylark-ajaxfy-spa
An Elegant HTML5 Single Page Application Framework  
![アーキテクチャ](https://github.com/skylark-ajaxfy/skylark-ajaxfy-spa/blob/master/docs/architecure.jpg "アーキテクチャ")

## Features

- Easy to manage  
The application functions are managed by the configuration file and the framework using controller pattern , unit test and division of labor development become easier.
- [skylark-ajaxfy-router](https://github.com/skylark-ajaxfy/skylark-ajaxfy-router) is built-in. [skylark-ajaxfy-router's features](https://github.com/skylark-ajaxfy/skylark-ajaxfy-router/blob/master/README.md#features)
- Lightweight, even if allinone is only 17k(minified),6k(gzip)

## Dependences
| Project | Description |
|---------|-------------|
| [skylark-langx](https://github.com/skylarkjs/skylark-langx)  | Javascript language extension library |
| [skylark-ajaxfy-router](https://github.com/skylark-ajaxfy/skylark-ajaxfy-router)   | Front-end routing framework |

##  Different builds
|  | build | Description |
|---------|--------|-------------|
| full | skylark-ajaxfy-spa-all.js | included skylark-langx and skylark-ajaxfy-router |
| only spa | skylark-ajaxfy-spa.js | not included skylark-langx and skylark-ajaxfy-router|
| full （development） | uncompressed/skylark-ajaxfy-spa-all.js | included skylark-langx and skylark-ajaxfy-router  |
| only router （development）| uncompressed/skylark-ajaxfy-spa.js | not included skylark-langx and skylark-ajaxfy-router|

## Installation
There are multiple ways to install the skylark-ajaxfy-spa library. 
- npm  
npm install https://github.com/skylark-ajaxfy/skylark-ajaxfy-spa#master --save

## Examples
Please access the following site for the execution of each example program under the "/examples" directory.

- http://examples.skylarkjs.org/skylark-ajaxfy-spa/

## Document

1. [Overview](https://github.com/skylarkjs/skylark-ajaxfy-spa/blob/master/docs/Overview.md)
1. [Architecure](https://github.com/skylarkjs/skylark-ajaxfy-spa/blob/master/docs/Architecure.md)
1. [Guide](https://github.com/skylarkjs/skylark-ajaxfy-spa/blob/master/docs/Guide.md)
1. [API](https://github.com/skylarkjs/skylark-ajaxfy-spa/blob/master/docs/API.md)

## Building skylark-ajaxfy-spa

- Ensure that Node.js is installed.
- Run npm gulp -g to ensure gulp is installed.
- Run npm install to ensure the required dependencies are installed.
- change current directory to build/, and run gulp. The builds will be placed in the dist/ directory.

## Integration
This library is completely built-in on [skylark.js](https://github.com/skylarkjs/skylark), and when you use  [skylark.js](https://github.com/skylarkjs/skylark) to develop an application, you do not have to use this library's API directly

## License

Released under the [MIT](http://opensource.org/licenses/MIT)
