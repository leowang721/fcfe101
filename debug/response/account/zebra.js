define(function (require, exports, module) {
    module.exports = function (path, param, context) {
        // ms v0.1.11开始增加context及setCookie
        if (context) {
            // 设置会话级cookie，保证auth权限有效
            setCookie({
                '__cas__rn__': 'kslf_cas_rn',
                '__cas__st__3': 'kslf_cas_st_3'
            }, context);
        }

        var userid = context.POST.userid;

        // if (!userid) {
        //     return {
        //         status: false
        //     }
        // }

        return {
            status: true
        };
    }
});