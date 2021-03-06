import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueClipboards from 'vue-clipboards'
import '@/assets/sass/app.scss'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueClipboards)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
