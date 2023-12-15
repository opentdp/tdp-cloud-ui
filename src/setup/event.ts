/**
 * 阻止事件传播
 */

import type { App, Plugin } from 'vue';

const plugin: Plugin = {
    install: (app: App) => {
        app.directive('click-stop', (el: HTMLElement) => {
            el.addEventListener('click', event => {
                event.stopPropagation();
            });
        });

    },
};

// export default

export default (app: App) => {
    app.use(plugin);
};
