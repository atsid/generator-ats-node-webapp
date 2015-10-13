# Build System Overview
This directory contains the Gulp build system used by the project. The build is segregated into task files in the 
`tasks/` directory. These files are automatically scanned and included in the build. `config.js` contains the global 
configuration object for the build.

# Task Definitions
* **build (default task)** (default.js) - A rollup task that performs `lint`, `prepare-assets`, `bundle`, and `test`.
* **jade** (assets.js) - Processes static Jade assets into HTML files in the `/public` dir.
* **html** (assets.js) - Copies HTML assets files into the `/public` dir.
* **assets** (assets.js) - Copies asset files (`/client/assets`) into the `/public/assets` dir. This contains the Favicon.
Normally images should not be copied here, as it will bypass minification.
* **imagemin** (assets.js) - Performs Image Minification on images within in the `client/` dir and copies the result 
into the `/public` dir.
* **sass** (assets.js) - Performs Sass compilation of the style files. 
* **prepare-assets** (assets.js) - A rollup task that includes `jade`, `html`, `assets`, `imagemin`, and `sass`.
* **lint** (lint.js) - Performs linting using eslint over the client, server, and build code.
* **lint-client** (lint.js) - Performs linting over the client source and test code.
* **lint-server** (lint.js) - Performs linting over the server source and test code.
* **lint-build** (lint.js) - Performs linting over the build source.
* **publish** (publish.js) - Publishes the client, consisting of anything build in `public/` to an S3 bucket and 
Cloudformation stack. Resources names are hashed to minimize cache invalidation cost in AWS. 
* **test** (test.js) - Performs testing over all of the source code.
* **test-server** (test.js) - Performs testing over the server source code.
* **server-tdd** (test.js) - Sets up a TDD loop for linting and testing server code.
* **test-client** (test.js) - Performs testing over the client source code.
* **client-tdd** (test.js) - Sets up a TDD loop for linting and testing client code.
* **watch-client** (watch-client.js) - Sets up watchers over the client codebase. Performs incremental linting, building, 
bundling, asset management, sass compilation, and livereload notifications.
* **develop** (server.js) - Starts up the server (either a development server or the RESTful application), starts 
the client-watching loop, and begins TDD on the client and server code. When the server code changes, the running server
 will be restarted.

# Internal Tasks
* **jade-incr** (assets.js) - Incremental Jade update, used during client-watch mode.
* **html-incr** (assets.js) - Incremental HTML update, used during client-watch mode.
* **assets-incr** (assets.js) - Incremental asset copying, used during client-watch mode.
* **imagemin-incr** (assets.js) - Incremental image minification; used during the client-watch mode.
* **lint-client-source** (lint.js) - Performs linting over the client source code
* **lint-client-test** (lint.js) - Performs linting over the client test code
* **lint-client-source-tdd* (lint.js) - Performs linting over the client source for TDD tasks 
* **lint-client-test-tdd* (lint.js) - Performs linting over the client tests for TDD tasks
* **lint-client-tdd* (lint.js) - Performs linting over the client source and test for TDD tasks
* **lint-server-source** (lint.js) - Performs linting over the server source code
* **lint-server-test** (lint.js) - Performs linting over the server test code
* **lint-server-source-tdd* (lint.js) - Performs linting over the server source for TDD tasks 
* **lint-server-test-tdd* (lint.js) - Performs linting over the server tests for TDD tasks
* **lint-server-tdd* (lint.js) - Performs linting over the server source and test for TDD tasks
* **test-server-tdd* (test.js) - TDD mode testing for server code.
* **test-client-tdd* (test.js) - TDD mode testing for client code.

# Notes
* Development tests in TDD-mode use the `nyan` test reporter for minimal vertical space usage. Production tests use the 
`spec` reporter.
