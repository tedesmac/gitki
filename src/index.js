import Server from 'server'
import {
  loadSettings,
  loadWebpackStats,
  updateWikiRepository,
} from 'server/utils'

loadWebpackStats()

const settings = loadSettings()

console.log(
  'Wiki repository will be updated every',
  settings.pullInterval,
  'minutes'
)
setInterval(
  updateWikiRepository,
  settings.pullInterval * 60000,
  settings.repository
)
updateWikiRepository(settings.repository)

Server.start()
