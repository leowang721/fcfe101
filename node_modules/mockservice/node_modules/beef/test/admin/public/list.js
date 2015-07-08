define(function (require, exports, modules) {
    var amd = require('source/amd');
    var mod = require('source/mod');
    var local = require('./local');
    var admin = require('admin');

    module.exports = {
        amd: amd,
        mod: mod,
        local: local,
        admin: admin
    };
});