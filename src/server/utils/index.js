import { defaultState, getMetaData } from 'client/utils'
import DirectoryTree from 'directory-tree'
import Fs from 'fs'
import Fuse from 'fuse.js'
import GitPromise from 'simple-git/promise'
import { createRenderer } from 'vue-server-renderer'

const articleRegex = /\/\w+\/wiki\/.+/i
const imgTagRegex = /!\[.*\]\(.*\)/g
const imgUrlRegex = /\(.*\)/
const searchRegex = /\/\w+\/search\/?/i
const tagRegex = /\/\w+\/tag\/.+/i

const defaultSettings = {
  pullInterval: 60,
  repository: '',
}

export const fixImgTags = markdown => {
  imgTagRegex.lastIndex = 0
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
  return results
}

export const getTagData = (lang, tag) => {
  console.log('[GET TAG]', lang, tag)
  return global.fuse
    .search(tag)
    .filter(item => item.lang === lang)
    .filter(item => item.tags.includes(tag))
    .sort((a, b) => {
      if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return -1
      }
      if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return 1
      }
      return 0
    })
}

export const getInitialState = (url, query) => {
  console.log('[INITAL STATE]', url)
  const lang = getLang(url)
  const state = {}
  if (articleRegex.test(url)) {
    const article = url.replace(/\/\w+\/wiki\//, '')
    state.article = getArticle(lang, article)
  } else if (searchRegex.test(url)) {
    state.searchResults = getSearch(lang, query)
  } else if (tagRegex.test(url)) {
    const tag = url.replace(/\/\w+\/tag\//, '')
    state.searchResults = getTagData(lang, tag)
  }
  return {
    ...defaultState,
    ...state,
    tags: global.tags[lang],
  }
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
    console.error('Unable to read wiki.config.settings.', error)
    process.exit(1)
  }
  return { ...defaultSettings, ...config }
}

export const loadWebpackStats = () => {
  try {
    const clientStats = JSON.parse(Fs.readFileSync('webpack-stats.client.json'))
    if (clientStats.status === 'done') {
      const { chunks } = clientStats
      global.clientScripts = Object.keys(chunks)
        .flatMap(key => {
          const scripts = chunks[key]
          return scripts.map(s => s.name)
        })
        .reverse()
    }
  } catch (error) {
    console.error('Unable to read webpack-stats.client.json', error)
    process.exit(1)
  }

  try {
    const cssStats = JSON.parse(Fs.readFileSync('webpack-stats.css.json'))
    if (cssStats.status === 'done') {
      const { chunks } = cssStats
      global.cssStyles = Object.keys(chunks)
        .flatMap(key => {
          const scripts = chunks[key]
          return scripts.map(s => s.name)
        })
        .filter(style => /\.css$/.test(style))
    }
  } catch (error) {
    console.error('Unable to read webpack-stats.client.json', error)
    process.exit(1)
  }
}

export const renderer = (component, scripts = [], styles = [], state = {}) => {
  const stylesString = styles.reduce((acc, style) => {
    return `${acc}
<link rel="stylesheet"
type="text/css"
href="/static/css/${style}">`
  }, '')

  const scriptsString = scripts.reduce((acc, name) => {
    return `${acc}<script src="/static/js/${name}"></script>`
  }, '')

  return createRenderer({
    template: `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    ${stylesString}
    <script>window.__INITIAL_STATE__ = ${JSON.stringify(state)}</script>
  </head>
  <body>
    <!--vue-ssr-outlet-->
    ${scriptsString}
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
  if (tree == null) {
    console.log('Unable to read wiki directory.')
    process.exit(1)
  }
  const articles = tree.children.flatMap(child => getWikiData(child))
  global.tags = articles.reduce((acc, article) => {
    const { lang, tags } = article
    if (lang in acc) {
      const missingTags = tags.map(tag => !acc[lang].includes(tag))
      acc[lang] = [...acc[lang], ...missingTags].sort()
    } else {
      acc[lang] = tags
    }
    return acc
  }, {})
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
  const git = GitPromise('wiki')
  git
    .status()
    .then(() => {
      console.log('Pulling repository')
      git.pull().then(() => {
        setFuseInstance()
      })
    })
    .catch(() => {
      const newRepo = GitPromise()
      console.log('Clonning repository')
      newRepo.clone(repoUrl, 'wiki').then(() => {
        setFuseInstance()
      })
    })
}
