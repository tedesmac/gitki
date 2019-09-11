import { getMetaData } from 'client/utils'
import DirectoryTree from 'directory-tree'
import Fs from 'fs'
import Fuse from 'fuse.js'
import SimpleGit from 'simple-git'
import { createRenderer } from 'vue-server-renderer'

const articleRegex = /\/\w+\/wiki\/.*/gi
const imgTagRegex = /!\[.*\]\(.*\)/g
const imgUrlRegex = /\(.*\)/g
const searchRegex = /\/\w+\/search\/?/gi

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

export const getArticle = (lang, articleUri) => {
  console.log('[GET ARTICLE]', lang, articleUri)
  try {
    const path = `wiki/content/${lang}/${articleUri}.md`
    const content = fixImgTags(Fs.readFileSync(path, 'utf8'))
    return getMetaData(content)
  } catch (error) {
    console.log('[GET ARTICLE]', error)
    return {}
  }
}

export const getSearch = (lang, query) => {
  console.log('[GET SEARCH]', lang, query)
  const results = global.fuse.search(query.q).filter(item => item.lang === lang)
  return { results }
}

export const getInitialState = (url, query) => {
  console.log('[INITAL STATE]', url)
  const lang = getLang(url)
  if (articleRegex.test(url)) {
    const article = url.replace(/\/\w+\/wiki\//, '')
    return getArticle(lang, article)
  }
  if (searchRegex.test(url)) {
    return getSearch(lang, query)
  }
  return {}
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

export const renderer = (component, scripts = [], state = {}) => {
  const scriptStrings = scripts.reduce((acc, name) => {
    return `${acc}<script src="/static/js/${name}"></script>`
  }, '')

  return createRenderer({
    template: `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="/static/css/main.css">
    <script>window.__INITIAL_STATE__ = ${JSON.stringify(state)}</script>
  </head>
  <body>
    <!--vue-ssr-outlet-->
    ${scriptStrings}
  </body>
</html>
`,
  })
    .renderToString(component)
    .then(html => html)
    .catch(error => {
      console.log('[RENDERER]:', error)
      return '<b>500</b> Internal server error'
    })
}

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
