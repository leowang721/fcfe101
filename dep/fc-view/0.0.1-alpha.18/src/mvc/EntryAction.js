/**
 * @file EntryAction 入口级别基础类
 *
 * @author Leo Wang(wangkemiao@baidu.com)
 */

define(function (require) {

    var _ = require('underscore');
    var fc = require('fc-core');
    var Model = require('emc/Model');

    var overrides = {};

    overrides.constructor = function () {
        this.$super(arguments);
    };

    overrides.enter = function (context) {
        var entering = this.$super(arguments);
        // 先尝试渲染loading tpl
        // model一定有了，但是view不一定有
        if (!context.isChildAction
            && !this.view
            && this.viewType && this.viewType.prototype) {
            try {
                var tplName = this.viewType.prototype.template + '-loading';
                var container = document.getElementById(context.container);
                var loadingData = _.chain(this.model.dump()).defaults(this.model.loadingData).value();
                container.innerHTML = fc.tpl.render(
                    tplName, loadingData
                );
                // 有ui的话还要初始化……
                var ViewContext = require('fcui/ViewContext');
                this.tempViewContext = new ViewContext(
                    container.id + 'tempViewContext'
                );

                var properties = this.viewType.prototype.getUIProperties
                    ? this.viewType.prototype.getUIProperties()
                    : this.viewType.prototype.uiProperties;
                require('fcui').init(container, {
                    viewContext: this.tempViewContext,
                    properties: properties,
                    valueReplacer: _.bind(
                        require('./BaseView').prototype.replaceValue,
                        {
                            model: new Model(loadingData)
                        }
                    )
                });
            }
            catch (e) {
                fc.util.processError(e);
            }
        }

        return entering;
    };

    overrides.forwardToView = function () {
        // 删掉tempViewContext
        if (this.tempViewContext) {
            this.tempViewContext.dispose();
            this.tempViewContext = null;
        }
        this.$super(arguments);
    };

    var EntryAction = fc.oo.derive(require('./BaseAction'), overrides);

    return EntryAction;
});
