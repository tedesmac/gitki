import AppComponent from 'components/app'
import Router from 'router'
import Store from 'store'
import Vue from 'vue'

export default (state = {}) => {
  const router = Router()
  const store = Store(state)
  const app = new Vue({
    router,
    store,
    render: h => h(AppComponent),
  })
  return { app, router, store }
}
