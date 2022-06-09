import { createApp } from 'vue';

import App from '@/app.vue';
import '@/assets/style.scss';

import setupEcharts from '@/helper/echarts';
import setupElement from '@/helper/element';
import setupStore from '@/store/index';

import router from '@/router/index';

const app = createApp(App);

setupEcharts(app);
setupElement(app);
setupStore(app);

app.use(router);
app.mount('#app');
