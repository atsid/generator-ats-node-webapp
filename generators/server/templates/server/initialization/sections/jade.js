const path = require('path');
const config = require('config');

module.exports = {
  name: 'jade rendering',
  configure(app) {
    app.set('views', [
      path.join(__dirname, '../../../client/'),
    ]);
    app.set('view engine', 'jade');
    app.engine('jade', require('jade').__express);
    app.get('/', (req, res) => {
      res.render('index', config);
    });
    app.get('/*.html', (req, res) => {
      const templateName = req.url.substring(1, req.url.indexOf('.html'));
      res.render(templateName, config);
    });
  },
};
