"use strict";
const log = require('debug')("app:bootstrap");
const express = require("express");
const http = require("http");
const path = require("path");
const config = require("config");

const app = express();
app.use(express.static(path.join(__dirname, "public")));

// HTML5 Pushstate Support
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


const server = http.createServer(app);
server.listen(config.server.port, () => {
  log('server listening on port ', config.server.port);
});
