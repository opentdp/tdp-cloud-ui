import { App } from 'vue';
import { createPinia } from 'pinia';

const store = createPinia();

export default (app: App<Element>) => {
    app.use(store);
};
