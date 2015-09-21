"use strict";
var debug = require("debug")("app:bootstrap");
var express = require("express");
var http = require("http");
var path = require("path");
var config = require("config");

var app = express();
app.use(express.static(path.join(__dirname, "public")));
var server = http.createServer(app);
server.listen(config.server.port, function onListening() {
  debug('server listening on port ', config.server.port);
});
