import Server from 'server'
import {
  loadSettings,
  setFuseInstance,
  updateWikiRepository,
} from 'server/utils'

const settings = loadSettings()
console.log(settings)

updateWikiRepository(settings.repository)

setFuseInstance()

Server.start()
