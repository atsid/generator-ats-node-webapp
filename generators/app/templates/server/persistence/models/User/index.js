const organizer = require('mongoose-organizer');
module.exports = mongoose => organizer.autowire('User', __dirname, {mongoose: mongoose});
