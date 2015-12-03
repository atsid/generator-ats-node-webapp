"use strict";
const log = require('log4js').getLogger("app:bootstrap");
const express = require("express");
const http = require("http");
const path = require("path");
const config = require("config");

const app = express();

const webpack = require('webpack');
const webpackConfig = require('./webpack.config.dev');
const compiler = webpack(webpackConfig);
app.use(require('webpack-dev-middleware')(compiler, {noInfo: true}));
app.use(require('webpack-hot-middleware')(compiler));

app.use(express.static(path.join(__dirname, "public")));

// HTML5 Pushstate Support
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const server = http.createServer(app);
server.listen(config.server.port, () => {
  log.info('server listening on port ', config.server.port);
});
