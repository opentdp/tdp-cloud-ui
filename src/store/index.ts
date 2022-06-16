import { createPinia } from "pinia"
import piniaPersist from "pinia-plugin-persist"
import { App } from "vue"

const pinia = createPinia()
pinia.use(piniaPersist)

export default (app: App) => {
  app.use(pinia)
}
