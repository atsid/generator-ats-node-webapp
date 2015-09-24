const React = require('react/addons');
const Login = require('./Login');
const NyanCat = require('./NyanCat');

const Dashboard = React.createClass({
  contextTypes: {
    stores: React.PropTypes.object.isRequired,
  },

  getInitialState() {
    return {};
  },

  componentDidMount() {
    return this.getStateFromStore();
  },

  getStateFromStore() {
    this.setState({loading: true});
    this.context.stores.users.getCurrentUser()
      .then((user) => this.setState({user, loading: false}))
      .catch(() => this.setState({loading: false}));
  },

  render() {
    let result = null;
    if (this.state.user) {
      result = (<NyanCat />);
    } else {
      result = (<Login />);
    }
    return result;
  },
});

module.exports = Dashboard;
