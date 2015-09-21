const Bluebird = require('bluebird');
module.exports = (invocation) => {
  return new Bluebird((resolve, reject) => {
    invocation.end((err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};
