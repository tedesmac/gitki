import ArticleComponent from 'components/article'
import IndexComponent from 'components/index'
import SearchComponent from 'components/search'
import TagComponent from 'components/tag'
import Router from 'vue-router'
import Vue from 'vue'

Vue.use(Router)

export default () =>
  new Router({
    mode: 'history',
    routes: [
      {
        path: '/:locale',
        component: IndexComponent,
      },
      {
        path: '/:locale/search',
        component: SearchComponent,
      },
      {
        path: '/:locale/tag/:tag',
        component: TagComponent,
      },
      {
        path: '/:locale/wiki/:article',
        component: ArticleComponent,
      },
    ],
  })
