const express = require('express');
const initialization = require('./initialization');
const app = express();
initialization.configure(app);
module.exports = app;
