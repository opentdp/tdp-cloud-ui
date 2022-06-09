import { createPinia } from 'pinia';

const store = createPinia();

export default (app: any) => {
    app.use(store);
};
