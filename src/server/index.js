import 'core-js/stable'
import 'regenerator-runtime/runtime'
import Hapi from '@hapi/hapi'
import Inert from '@hapi/inert'
import Routes from 'routes'

export default {
  start: async (port = '3000') => {
    const server = Hapi.server({
      host: 'localhost',
      port,
      debug: {
        log: '*',
        request: '*',
      },
    })

    await server.register(Inert)

    server.route(Routes)

    server.events.on('log', (event, tags) => {
      console.log(tags, event)
    })

    server.start()

    console.log('server running at:', server.info.uri)
  },
}
