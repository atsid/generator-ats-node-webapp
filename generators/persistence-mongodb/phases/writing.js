module.exports = {
  packageJson() {
    this.addDependencies(
      'mongoose',
      'mongoose-organizer',
      'mongoose-q',
      'q-bluebird'
    );
  },
};
