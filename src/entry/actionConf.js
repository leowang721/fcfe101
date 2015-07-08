/**
 * @file [please input description] - Action配置
 *
 * @author Leo Wang(wangkemiao@baidu.com)
 */
define(function (require) {
    var confList = [
        require('./404/actionConf'),
        require('./index/actionConf'),
        require('./demo/hello/component/actionConf'),
        require('./demo/hello/ui/actionConf'),
        require('./demo/hello/ajax/actionConf'),
        require('./demo/hello/page/actionConf'),
        require('./demo/hello/project/actionConf'),
        require('./demo/hello/dialog/actionConf'),
        require('./demo/hello/interactive/actionConf')
    ];
    return confList;
});
