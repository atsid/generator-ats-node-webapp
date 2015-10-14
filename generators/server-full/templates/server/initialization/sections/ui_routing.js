const config = require('config');
const UI_ROUTE_REGEX = /^(?!\/api|.*\.).*/;

module.exports = {
  name: 'ui route rewriting',
  regex: UI_ROUTE_REGEX,
  configure(app) {
    app.get(UI_ROUTE_REGEX, (req, res) => {
      res.render('index', config);
    });
  },
};
