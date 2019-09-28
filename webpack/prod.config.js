const Merge = require('webpack-merge') // eslint-disable-line import/no-extraneous-dependencies
const BaseConfig = require('./base.config.js')

const mode = 'production'

module.exports = [
  Merge(BaseConfig.client, {
    output: {
      filename: '[name].bundle.[chunkhash].js',
    },
    mode,
  }),
  Merge(BaseConfig.scss, {
    output: {
      filename: '[name].bundle.[chunkhash].scss',
    },
  }),
  Merge(BaseConfig.server, {
    optimization: {
      minimize: false,
    },
    mode,
  }),
]
