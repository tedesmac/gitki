import AppComponent from 'components/app'
import Router from 'router'
import Store from 'store'
import Vue from 'vue'
import { sync } from 'vuex-router-sync'

export default (state = {}) => {
  const router = Router()
  const store = Store(state)
  sync(store, router)
  const app = new Vue({
    router,
    store,
    render: h => h(AppComponent),
  })
  return { app, router, store }
}
