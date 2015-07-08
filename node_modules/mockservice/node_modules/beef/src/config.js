var path = require('path');
var root = process.cwd();
var packages = {};

module.exports = {
    config: function (option) {
        var baseUrl = option.baseUrl;
        if (baseUrl) {
            baseUrl = path.resolve(process.cwd(), baseUrl);
            root = baseUrl;
            if (option.name) {
                packages[option.name] = baseUrl;
            }
        } else {
            baseUrl = root;
        }

        if (option.packages) {
            var pkgs = option.packages;

            for (var item in pkgs) {
                if (packages.hasOwnProperty(item)) {
                    throw Error('packages aready existed');
                } else {
                    packages[item] = path.resolve(baseUrl, pkgs[item]);
                }
            }
        }
    },
    clear: function (pkg) {
        if (pkg === true) {
            packages = {};
            return;
        }
        
        // 单独删除一个包
        if (pkg && packages.hasOwnProperty(pkg)) {
            delete packages.pkg;
        }
    },
    resolve: function (relativeId, module) {
        if (relativeId.charAt(0) !== '.') {
            if (relativeId in packages) {
                return packages[relativeId];
            }
            for (var item in packages) {
                if (relativeId.indexOf(item) == 0) {
                    return relativeId.replace(item, packages[item]);
                }
            }
        } else if (module && module.filename) {
            return path.resolve(module.filename, '../' + relativeId);
        } else {
            return path.resolve(root, relativeId);
        }

        return relativeId;
    }
};