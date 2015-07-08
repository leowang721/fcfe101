/* eslint-disable */
exports.port = 8848;
exports.directoryIndexes = true;
exports.documentRoot = __dirname;
var ms = require('mockservice');
ms.config({
    name: 'nirvana',
    dir: __dirname + '/debug'
});

function addCookie() {
    var expires = 'Wed, 23 Jul 2015 02:52:19 GMT';
    var cookies = [
        '__cas__rn__=kslf_cas_rn;path=/;expires=' + expires,
        '__cas__st__3=kslf_cas_st_3;path=/'
    ];
    return function (context) {
        context.header['Set-Cookie'] = cookies;
    };
}

exports.getLocations = function () {
    return [
        {
            location: /\/main\.do/,
            handler: [
                addCookie(),
                redirect('main.html?userid=7', false)
            ]
        },
        {
            location: /\/request\.ajax/,
            handler: ms.request()
        },
        {
            location: /zebra|scookie/,
            handler: ms.request()
        },
        { 
            location: /\/$/, 
            handler: home( 'main.html' )
        },
        { 
            location: /^\/redirect-local/, 
            handler: redirect('redirect-target', false) 
        },
        { 
            location: /^\/redirect-remote/, 
            handler: redirect('http://www.baidu.com', false) 
        },
        { 
            location: /^\/redirect-target/, 
            handler: content('redirectd!') 
        },
        { 
            location: '/empty', 
            handler: empty() 
        },
        { 
            location: /\.css($|\?)/, 
            handler: [
                autocss()
            ]
        },
        { 
            location: /\.less($|\?)/, 
            handler: [
                file(),
                less()
            ]
        },
        { 
            location: /\.styl($|\?)/, 
            handler: [
                file(),
                stylus()
            ]
        },
        { 
            location: /^.*$/, 
            handler: [
                file(),
                proxyNoneExists()
            ]
        }
    ];
};

exports.injectResource = function ( res ) {
    for ( var key in res ) {
        global[ key ] = res[ key ];
    }
};
