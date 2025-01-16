import { routes } from 'unplugin-vue2-pages/auto-routes'
import Vue from 'vue'

import App from './app.vue'

import routeBlock from './app.vue?vue&type=route'

console.log('routeBlock', routeBlock)
console.log('routes', routes)

export const app = new Vue({
  el: '#app',
  render: h => h(App),
})
