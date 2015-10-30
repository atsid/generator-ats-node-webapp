const startupHooks = require('./startup_hooks');

describe('The startup hook manager', () => {
  it('can accept an incoming startup hook promise', (done) => {
    startupHooks.addHook(Promise.resolve(1));
    startupHooks.resolve()
      .then(() => done())
      .catch((err) => done(err));
  });
});
