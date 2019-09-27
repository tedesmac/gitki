import Server from 'server'
import {
  loadSettings,
  setFuseInstance,
  updateWikiRepository,
} from 'server/utils'

const settings = loadSettings()

updateWikiRepository(settings.repository).then(() => {
  setFuseInstance()
})

Server.start()
