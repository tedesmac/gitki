import AppFactory from 'factory'

const { app, store } = AppFactory()

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

app.$mount('#app')
