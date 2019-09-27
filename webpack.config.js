const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

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
    client: path.resolve(__dirname, 'src/client'),
    components: path.resolve(__dirname, 'src/components'),
    factory: path.resolve(__dirname, 'src/factory'),
    router: path.resolve(__dirname, 'src/router'),
    routes: path.resolve(__dirname, 'src/routes'),
    server: path.resolve(__dirname, 'src/server'),
    store: path.resolve(__dirname, 'src/store'),
    views: path.resolve(__dirname, 'src/views'),
    vue$: 'vue/dist/vue.esm.js',
  },
  extensions: ['.js', '.json', '.vue'],
}

const mode = 'development'

module.exports = [
  // client scripts
  {
    target: 'web',
    entry: {
      client: path.resolve(__dirname, 'src/client'),
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist/client/js'),
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
    module: { rules },
    mode,
    plugins,
    resolve,
  },
  // scss
  {
    entry: {
      main: path.resolve(__dirname, 'src/scss/main.scss'),
    },
    output: {
      filename: '[name].scss',
      path: path.resolve(__dirname, 'dist/client/css'),
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
    mode,
  },
  // server
  {
    target: 'node',
    entry: {
      main: path.resolve(__dirname, 'src/index.js'),
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
      libraryTarget: 'commonjs2',
    },
    module: { rules },
    mode,
    plugins,
    resolve,
  },
]
