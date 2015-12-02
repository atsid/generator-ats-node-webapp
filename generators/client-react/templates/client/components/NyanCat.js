const React = require('react');
const mui = require('material-ui');
const log = require('log4js').getLogger('app:components:NyanCat');
const Card = mui.Card;
const CardHeader = mui.CardHeader;
const CardMedia = mui.CardMedia;

const NyanCat = React.createClass({
  contextTypes: {
    stores: React.PropTypes.object.isRequired,
  },

  getInitialState() {
    return {};
  },

  componentDidMount() {
    this.getStateFromStore();
  },

  getStateFromStore() {
    this.setState({projects: [], loading: true});
    this.context.stores.nyan.getNyanSource()
      .then((nyanSource) => {
        this.setState({nyanSource, loading: false});
      })
      .catch((err) => {
        log.debug('error loading store data', err);
        this.setState({loading: false});
      });
  },

  render() {
    return (
      <Card>
        <CardHeader title="Nyan Cat!" />
        <CardMedia>
          <img src={this.state.nyanSource} />
        </CardMedia>
      </Card>
    );
  },
});

module.exports = NyanCat;
