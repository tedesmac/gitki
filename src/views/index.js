import AppFactory from 'factory'
import { getInitialState, renderer } from 'utils'

const createApp = context => {
  return new Promise((resolve, reject) => {
    const state = getInitialState(context.url, context.query)
    console.log('[STATE]', state)

    const { app, router, store } = AppFactory(state)

    router.push(context.url)

    router.onReady(() => {
      const matcheComponents = router.getMatchedComponents()

      if (!matcheComponents.length) {
        return reject(new Error("Vue Router doesn't contain any components"))
      }

      context.rendered = () => {
        context.state = store.state
      }

      resolve(app)
    }, reject)
  })
}

export default req => {
  const context = { query: req.query, url: req.path }

  return createApp(context)
    .then(app => renderer(app, ['vendors~client.js', 'client.js']))
    .catch(error => {
      console.log('[APP VIEW]', error)
      return '<b>500</b> Internal server error'
    })
}
