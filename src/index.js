import Cron from 'cron'
import Server from 'server'
import { loadSettings, updateWikiRepository } from 'server/utils'

const settings = loadSettings()

console.log(
  'Wiki repository will be updated every',
  settings.pullInterval,
  'minutes'
)
const job = new Cron.CronJob(
  `* */${settings.pullInterval} * * * *`,
  () => {
    updateWikiRepository(settings.repository)
  },
  null,
  false,
  null,
  undefined,
  true
)
job.start()

Server.start()
