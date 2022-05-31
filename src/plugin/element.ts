import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'

import { createI18n } from 'vue-i18n'

import localeZH from 'element-plus/lib/locale/lang/zh-cn'
import localeEN from 'element-plus/lib/locale/lang/en'

const i18n = createI18n({
  locale: localeZH.name,
  fallbackLocale: localeEN.name
})

export default (app) => {

  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

  app.use(ElementPlus, { locale: localeZH })
  app.use(i18n)

  return app

}
