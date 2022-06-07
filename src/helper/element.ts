// https://element-plus.org/zh-CN/

import { App } from 'vue';
import ElementPlus from 'element-plus';

import * as Icons from '@element-plus/icons-vue';
import zhCn from 'element-plus/lib/locale/lang/zh-cn';

export default (app: App<Element>) => {
    for (const icon of Object.entries(Icons)) {
        app.component(...icon);
    }
    app.use(ElementPlus, { locale: zhCn });
};
