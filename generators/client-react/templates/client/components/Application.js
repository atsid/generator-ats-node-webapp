const React = require('react');

// Router Components
const ReactRouter = require('react-router');
const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const IndexRoute = ReactRouter.IndexRoute;
const createBrowserHistory = require('history/lib/createBrowserHistory');

// Application Components
const NoMatch = require('./NoMatch');
const Skeleton = require('./Skeleton');
const Dashboard = require('./Dashboard');
const Login = require('./Login');
const NyanCat = require('./NyanCat');

// MUI
const ThemeManager = require('material-ui/lib/styles/theme-manager');
const MuiTheme = require('material-ui/lib/styles/raw-themes/light-raw-theme');

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
const injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();

const Application = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object,
    stores: React.PropTypes.object.isRequired,
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(MuiTheme),
      stores: require('./../stores'),
    };
  },

  render() {
    return (
      <Router history={createBrowserHistory()}>
        <Route path="/" component={Skeleton}>
          <IndexRoute component={Dashboard} />
          <Route path="login" component={Login} />
          <Route path="nyan" component={NyanCat} />
          <Route path="*" component={NoMatch} />
        </Route>
      </Router>
    );
  },
});
module.exports = Application;
