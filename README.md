# vcloading
simple page loading bar

## Install

```shell
#with npm
npm install vcloading
#with yarn
yarn add vcloading 
# Or you can just copy the index.js to you project
```

## Usage
```javascript
// ES6 Import 
import vcloading from 'vcloading';
// CommonJs
var vcloading = require('vcloading');
// global 
var vcloading = window.vcloading;
````
The `vcloading` object has two methods, `start` and `complete`.

| method | args | description |
|------|---------------|-------------|
| start  | an object that contains two properties, `barColor` and `zIndex` | start the loading bar|
| complete | -- | complete the loading |
