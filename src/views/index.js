import AppFactory from 'factory'
import { getInitialState, renderer } from 'server/utils'

const createApp = context => {
  return new Promise((resolve, reject) => {
    const { app, router } = AppFactory(context.state)

    router.push(context.url)

    router.onReady(() => {
      const matcheComponents = router.getMatchedComponents()

      if (!matcheComponents.length) {
        return reject(new Error("Vue Router doesn't contain any components"))
      }

      resolve(app)
    }, reject)
  })
}

export default req => {
  const state = getInitialState(req.path, req.query)
  const context = { url: req.path, state }

  return createApp(context)
    .then(app => renderer(app, ['vendors~client.js', 'client.js'], state))
    .catch(error => {
      console.log('[APP VIEW]', error)
      return '<b>500</b> Internal server error'
    })
}
