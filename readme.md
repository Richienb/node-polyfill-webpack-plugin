# node-polyfill-webpack-plugin [![Travis CI Build Status](https://img.shields.io/travis/com/Richienb/node-polyfill-webpack-plugin/master.svg?style=for-the-badge)](https://travis-ci.com/Richienb/node-polyfill-webpack-plugin)

Polyfill Node.js core modules in Webpack.

This module is only needed for [webpack 5+](https://github.com/webpack/changelog-v5#automatic-nodejs-polyfills-removed).

[![NPM Badge](https://nodei.co/npm/node-polyfill-webpack-plugin.png)](https://npmjs.com/package/node-polyfill-webpack-plugin)

## Install

```sh
npm install node-polyfill-webpack-plugin
```

## Usage

Add the following to your `webpack.config.js`:

```js
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

module.exports = {
	// Other rules...
	plugins: [
		new NodePolyfillPlugin()
	]
}
```
