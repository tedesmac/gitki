const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // eslint-disable-line import/no-extraneous-dependencies
const VueLoaderPlugin = require('vue-loader/lib/plugin') // eslint-disable-line import/no-extraneous-dependencies

const BASE_DIR = path.resolve(__dirname, '..')
const DIST_DIR = path.resolve(BASE_DIR, 'dist')
const SRC_DIR = path.resolve(BASE_DIR, 'src')
const CLIENT_CSS_DIR = path.resolve(DIST_DIR, 'client/css')
const CLIENT_JS_DIR = path.resolve(DIST_DIR, 'client/js')

const rules = [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
      },
    },
  },
  {
    test: /\.vue$/,
    exclude: /node_modules/,
    use: 'vue-loader',
  },
]

const plugins = [new VueLoaderPlugin()]

const resolve = {
  alias: {
    client: path.resolve(SRC_DIR, 'client'),
    components: path.resolve(SRC_DIR, 'components'),
    factory: path.resolve(SRC_DIR, 'factory'),
    router: path.resolve(SRC_DIR, 'router'),
    routes: path.resolve(SRC_DIR, 'routes'),
    server: path.resolve(SRC_DIR, 'server'),
    store: path.resolve(SRC_DIR, 'store'),
    views: path.resolve(SRC_DIR, 'views'),
    vue$: 'vue/dist/vue.esm.js',
  },
  extensions: ['.js', '.json', '.vue'],
}

module.exports = {
  client: {
    target: 'web',
    entry: {
      client: path.resolve(SRC_DIR, 'client'),
    },
    output: {
      path: CLIENT_JS_DIR,
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
    module: { rules },
    plugins,
    resolve,
  },
  scss: {
    entry: {
      main: path.resolve(SRC_DIR, 'scss/main.scss'),
    },
    output: {
      path: CLIENT_CSS_DIR,
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].css',
      }),
    ],
    module: {
      rules: [
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: true,
              },
            },
            'css-loader',
            'sass-loader',
          ],
        },
      ],
    },
  },
  server: {
    target: 'node',
    entry: {
      main: SRC_DIR,
    },
    output: {
      filename: '[name].js',
      path: DIST_DIR,
      libraryTarget: 'commonjs2',
    },
    module: { rules },
    plugins,
    resolve,
  },
}
