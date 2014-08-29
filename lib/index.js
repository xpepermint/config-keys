'use strict';

/**
 * Module dependencies.
 */

var _ = require('lodash');
var path = require('path');
var fs = require('fs');
var argv = require('yargs').argv;

/**
 * Setting process environment name.
 */

process.env.NODE_ENV = argv.e || argv.environment || process.env.NODE_ENV || 'development';

/**
 * Module dependencies.
 */

module.exports = {

  /**
   * Returns environment name.
   *
   * @return {string}
   */

  get env() {
    return process.env.NODE_ENV;
  },

  /**
   * Sets environment name.
   *
   * @param {string}
   */

  set env(e) {
    process.env.NODE_ENV = e;
  },

  /**
   * Configuration variables.
   */

  data: { default: {} },

  /**
   * Reads the `what` parameter and returns it's content.
   *
   * @param {object|string} what
   * @return {object}
   */

  read: function(what) {
    var mainData = what;
    var localData = {};
    if (typeof what == 'string') {
      // main
      var mainFile = path.resolve(process.cwd(), what);
      delete require.cache[mainFile];
      mainData = require(mainFile);
      // local
      var localFile = mainFile.substr(0, mainFile.lastIndexOf('.'))+'.local'+path.extname(mainFile);
      if (fs.existsSync(localFile)) {
        delete require.cache[localFile];
        localData = require(localFile);
      }
    }
    // main and local merged
    return _.merge({},
      _.merge({}, mainData.default, mainData[this.env]),
      _.merge({}, localData.default, localData[this.env])
    );
  },

  /**
   * Reads the `what` parameter and stores/caches its content to `data`.
   *
   * @param {object|string} what
   * @return {this}
   */

  load: function(what) {
    this.data = this.read(what);
    return this;
  },

  /**
   * Checks if the process environment name equals to the `env` attribute value.
   *
   * @param {string} env
   * @return {boolean}
   */

  is: function(env) {
    return this.env == env;
  }

};
