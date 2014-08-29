# config-keys

![Build Status](https://travis-ci.org/xpepermint/config-keys.svg?branch=master)&nbsp;[![NPM version](https://badge.fury.io/js/config-keys.svg)](http://badge.fury.io/js/config-keys)&nbsp;[![Dependency Status](https://gemnasium.com/xpepermint/config-keys.svg)](https://gemnasium.com/xpepermint/config-keys)

Simple environment-based application settings for NodeJS.

## Installation

Install the [npm](https://www.npmjs.org/package/config-keys) package.

```
npm install config-keys --save
```

## Usage

The module will try to load `config/settings.js` file by default. We can
configura this behavior over `load` method. The best place to do this is in
your application's main file.

```js
// read configuration file
var _ = require('config-keys').load('path/to/file.js');
// load
var _ = require('config-keys').load({ ... });
```

Then anywhere in your application you use the module as shown bellow.

```js
var _ = require('config-keys');
console.log( _.data.keyName );
```

## Configuration File

Settings file should look like the example bellow.

```
// config/settings.js
module.exports = {
  default: { ... },
  production: { ... }
};
```

Not that you can also create a local file (e.g. `config/settings.local.js`) to override data of the original file.

## API

### .load(what)

Type: `Function`
Returns: `Object`

Reads the `what` parameter and stores/caches its content to `data`. Note that `what` parameter can be a file path or an object with keys.

```js
_.load('path/to/file.js');
_.load({ ... });
```

### .read(what)

Type: `Function`
Returns: `Object`

Reads the `what` parameter and returns it's content. Unlike the `load` method, this function does not use cache and does not modify modules data.

```js
_.read('path/to/file.js');
_.read({ ... });
```

### .is(env)

Type: `Function`
Returns: `Boolean`

Checks if the node process environment name equals to the `env` attribute value.

```js
console.log( _.is('development') );
// -> true
```

### .env

Type: `String`
Default: `development`

Node process environment name. Beside the `NODE_ENV` enviroment variable, the value is also affected when application is called with `--env` of `-e` command-line argument (e.g. `node -e staging app.js`).

```js
console.log( _.env );
// -> production
```

### .data

Type: `Object`
Default: `{}`

Configuration data object where `default` and `{environment}` keys are merged.

```js
console.log( _.data.myName );
// -> xpepermint
```
