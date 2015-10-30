function autohandle(resolve, reject) {
  return (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
  };
}

module.exports = autohandle;
