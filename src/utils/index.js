import { getMetaData } from 'client/utils'
import DirectoryTree from 'directory-tree'
import Fs from 'fs'
import Fuse from 'fuse.js'
import SimpleGit from 'simple-git'
import { createRenderer } from 'vue-server-renderer'

const imgTagRegex = /!\[.*\]\(.*\)/g
const imgUrlRegex = /\(.*\)/g

export const fixImgTags = markdown => {
  return markdown
    .match(imgTagRegex)
    .map(match => {
      const index = match.search(imgUrlRegex)
      const url = match.substring(index)
      return [url, `(/static/${url.substring(1)}`]
    })
    .reduce((acc, replacement) => {
      const faultyUrl = replacement[0]
      const fixedUrl = replacement[1]
      return acc.replace(faultyUrl, fixedUrl)
    }, markdown)
}

const getLang = uri => {
  const uri2 = uri.substring(1)
  const index = uri2.indexOf('/')
  return uri2.substring(0, index)
}

const getWikiData = item => {
  if (item.type === 'directory') {
    return item.children.flatMap(child => getWikiData(child))
  }
  const content = Fs.readFileSync(item.path, 'utf8')
  const uri = item.path.replace('wiki/content', '').replace('.md', '')
  const lang = getLang(uri)
  return {
    lang,
    uri: uri.replace(lang, `${lang}/wiki`),
    ...getMetaData(content),
  }
}

export const loadSettings = () => {
  let config = {}
  try {
    const contents = Fs.readFileSync('wiki.config.json')
    config = JSON.parse(contents)
  } catch (error) {
    console.log(error)
  }
  return config
}

export const renderer = createRenderer({
  template: `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="/static/css/main.css">
  </head>
  <body>
    <!--vue-ssr-outlet-->
  </body>
</html>
`,
})

export const setFuseInstance = () => {
  const tree = DirectoryTree('wiki/content', {
    extensions: /\.md$/i,
    exclude: [/\.git/, /\/img/],
  })
  const articles = tree.children.flatMap(child => getWikiData(child))
  global.fuse = new Fuse(articles, {
    shouldSort: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: ['title', 'tags', 'markdown'],
  })
}

export const updateWikiRepository = repoUrl => {
  try {
    SimpleGit('wiki').pull((err, update) => {
      if (update && update.summary.changes) {
        console.log('Pulling')
      } else {
        console.log(err)
        console.log('repo is up to date')
      }
    })
  } catch (error) {
    console.log(error)
    console.log('clonning repository')
    SimpleGit().clone(repoUrl, 'wiki')
  }
}
