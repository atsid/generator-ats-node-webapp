const path = require('path');
const express = require('express');

module.exports = {
  name: 'static content',
  configure(app) {
    const clientPath = path.join(__dirname, '../../../public');
    app.use(express.static(clientPath));
  },
};
