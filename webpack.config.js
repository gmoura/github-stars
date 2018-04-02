const path = require('path');

module.exports = {
  devtool: 'eval',
  entry: {
    home: './javascript/index.js',
    user: './javascript/user.js',
  },

  output: {
    path: __dirname,
    publicPath: '/',
    filename: '[name].bundle.js'
  },

  module: {
    rules: [
      { test: /\.js$/, 
        exclude: /node_modules/, 
        loader: "babel-loader" 
      },
      {
        test: /\.scss$/,
        use: [{
            loader: "style-loader" // creates style nodes from JS strings
        }, {
            loader: "css-loader" // translates CSS into CommonJS
        }, {
            loader: "sass-loader", // compiles Sass to CSS
            options: {
              includePaths: [path.resolve(__dirname, 'node_modules/normalize-scss/sass')]
            }
        }]
      }
    ]
  },

  mode : 'development',

  resolve : {
    alias : {
      'public' : path.resolve(__dirname, 'public')
    }
  },

  externals: [
    'normalize-scss'
  ]
}
