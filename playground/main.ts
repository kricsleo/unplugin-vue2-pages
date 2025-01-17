import { routes } from 'unplugin-vue2-pages/auto-routes'
import Vue from 'vue'

import App from './app.vue'

console.log('routes', routes)

export const app = new Vue({
  el: '#app',
  render: h => h(App),
})
