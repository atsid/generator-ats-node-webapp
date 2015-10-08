const config = require('config');

module.exports = {
  name: 'ui route rewriting',
  configure(app) {
    app.get('*', (req, res) => {
      res.render('index', config);
    });
  },
};
