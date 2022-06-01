import { createApp } from 'vue'

import App from '@/App.vue'

import store from '@/helper/store'
import router from '@/helper/router'

import useElement from '@/plugin/element'

const app = createApp(App)

useElement(app)

app.use(store).use(router).mount('#app')
