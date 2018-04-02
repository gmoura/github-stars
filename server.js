const path = require('path');
const express = require('express');
const webpack = require('webpack');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const webpackMiddleware = require('webpack-dev-middleware');
const port = process.env.PORT || 3000;
const routers = require('./routes/index');
const config = require('./webpack.config');

const app = express();

const compiler = webpack(config);
const middleware = webpackMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false
  }
});

app.set('view engine', 'pug');

app.use('/public', express.static(path.join(__dirname, 'public')))

app.use(middleware);
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/', routers);

app.listen(port, 'localhost', err => {
  if (err) {
    console.log(err);
  }
  console.info(`==> 🌎 Listening on http://localhost:${port}/`);
});