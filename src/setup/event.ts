/**
 * 阻止事件传播
 */

import type { App, Plugin } from 'vue';

const plugin: Plugin = {
    install: (app: App) => {
        app.directive('event-stop', (el: HTMLElement, binding) => {
            const value = binding.value || 'click';
            el.addEventListener(value, event => {
                event.stopPropagation();
            });
        });
    },
};

// export default

export default (app: App) => {
    app.use(plugin);
};
