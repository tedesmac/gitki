import Path from 'path'
import AppView from 'views'

export default [
  {
    method: 'get',
    path: '/',
    handler: (req, res) => {
      req.log('VIEW', { path: req.path })
      return res.redirect('/en/')
    },
  },
  {
    method: 'get',
    path: '/static/css/{path*}',
    handler: (req, res) => {
      const path = Path.resolve('dist/client/css/', req.params.path)
      return res.file(path)
    },
  },
  {
    method: 'get',
    path: '/static/img/{path*}',
    handler: (req, res) => {
      const path = Path.resolve('wiki/img/', req.params.path)
      return res.file(path)
    },
  },
  {
    method: 'get',
    path: '/static/js/{path*}',
    handler: (req, res) => {
      const path = Path.resolve('dist/client/js/', req.params.path)
      return res.file(path)
    },
  },
  {
    method: 'get',
    path: '/{path*}',
    handler: AppView,
  },
]
