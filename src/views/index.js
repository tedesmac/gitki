import ArticleComponent from 'components/article'
import IndexComponent from 'components/index'
import SearchView from 'components/search'
import Fs from 'fs'
import { fixImgTags, renderer } from 'utils'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const articleView = req => {
  req.log('VIEW', { path: req.path })

  const articlePath = req.params.article
  const { locale } = req.params
  const path = `wiki/content/${locale}/${articlePath}.md`
  let markdown = ''

  try {
    markdown = fixImgTags(Fs.readFileSync(path, 'utf8'))
  } catch (error) {
    console.log(error)
  }

  const store = new Vuex.Store({
    state: {
      markdown,
    },
  })

  const article = new Vue({
    components: { ArticleComponent },
    template: `<ArticleComponent />`,
    store,
  })

  return renderer
    .renderToString(article)
    .then(html => html)
    .catch(error => {
      console.log(error)
      return '<b>500</b> Internal error'
    })
}

const indexView = req => {
  req.log('VIEW', { path: req.path })

  const index = new Vue({
    components: { IndexComponent },
    template: '<IndexComponent />',
  })

  return renderer
    .renderToString(index)
    .then(html => html)
    .catch(error => {
      console.log(error)
      return '<b>500</b> Internal error'
    })
}

const searchView = req => {
  req.log('VIEW', { path: req.path })
  const { locale } = req.params
  const query = req.query.q
  const results = global.fuse.search(query).filter(item => item.lang === locale)

  const store = new Vuex.Store({
    state: {
      results,
    },
  })

  const search = new Vue({
    components: { SearchView },
    template: '<SearchView />',
    store,
  })

  return renderer
    .renderToString(search)
    .then(html => html)
    .catch(error => {
      console.log(error)
      return '<b>500</b> Internal server error'
    })
}

export default {
  articleView,
  indexView,
  searchView,
}
