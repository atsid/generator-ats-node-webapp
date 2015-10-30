module.exports = (invocation) => {
  return new Promise((resolve, reject) => {
    invocation.end((err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};
