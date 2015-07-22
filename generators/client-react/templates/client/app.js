const React = require('react/addons');
const Application = require('./components/application');

window.onload = function onload() {
    // Facebook Authentication adds this value to the location hash
    if (window.location.hash.indexOf('_=_') > -1) {
        window.location.hash = '';
    }
    React.render(<Application />, document.getElementById('app'));
};
