import Server from 'server'
import { loadSettings, updateWikiRepository } from 'server/utils'

const settings = loadSettings()

updateWikiRepository(settings.repository)

Server.start()
