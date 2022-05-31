import { createApp } from 'vue'

import App from '@/App.vue'

import store from '@/helper/store'
import router from '@/helper/router'

import '@/plugin/chartjs'
import useElementPlus from '@/plugin/element'

useElementPlus(createApp(App))
    .use(store).use(router).mount('#app')
