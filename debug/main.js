/**
 * @file 配置debug环境，在main中require，但是实际上build时exclude掉
 * @author Leo Wang(wangkemiao@baidu.com)
 */
define(function (require) {
    window.DEBUG = true;
    nirvana.config.LOG_REQUEST_PATH =
        'http://ut.baidu.com/etech/product/er_package.jpg';

    if (!$.cookie('__cas__rn__')) {
        $.cookie('__cas__rn__', 'kslf_cas_rn');
    }
    if (!$.cookie('__cas__st__3')) {
        $.cookie('__cas__st__3', 'kslf_cas_st_3');
    }
});