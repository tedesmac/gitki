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
    vue$: 'vue/dist/vue.esm.js',
  },
  extensions: ['.js', '.json', '.vue'],
}

const mode = 'development'

module.exports = [
  // client scripts
  {
    target: 'web',
    entry: path.resolve(__dirname, 'src/client/index.js'),
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist/client/js'),
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
