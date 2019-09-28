const Merge = require('webpack-merge') // eslint-disable-line import/no-extraneous-dependencies
const BaseConfig = require('./base.config.js')

const mode = 'development'

module.exports = [
  Merge(BaseConfig.client, {
    output: {
      filename: '[name].bundle.js',
    },
    mode,
  }),
  Merge(BaseConfig.scss, {
    output: {
      filename: '[name].bundle.scss',
    },
  }),
  Merge(BaseConfig.server, {
    mode,
  }),
]
