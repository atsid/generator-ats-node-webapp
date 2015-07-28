[![Build Status](https://secure.travis-ci.org/atsid/generator-ats-node-webapp.png?branch=master)](https://travis-ci.org/atsid/generator-ats-node-webapp)
[![Code Climate](https://codeclimate.com/github/atsid/generator-ats-node-webapp/badges/gpa.svg)](https://codeclimate.com/github/atsid/generator-ats-node-webapp)
[![Test Coverage](https://codeclimate.com/github/atsid/generator-ats-node-webapp/badges/coverage.svg)](https://codeclimate.com/github/atsid/generator-ats-node-webapp/coverage)
[![Dependency Status](https://david-dm.org/atsid/express-jefferson.svg)](https://david-dm.org/atsid/express-jefferson)
[![Dev Dependency Status](https://david-dm.org/atsid/generator-ats-node-webapp/dev-status.svg)](https://david-dm.org/atsid/generator-ats-node-webapp)
# generator-ats-node-webapp

> A [Yeoman](http://yeoman.io) generator for generating NodeJS Web Applications 

The ats-node-webapp generator scaffolds a NodeJS web-application with normative standards for composing a high-quality application.
## Key Features
* An extensible build system implemented in Gulp. Tasks are automatically discovered in the `gulp/tasks` folder.
* A RESTful, hyperlinked API via express.
* Linting via AirBnb's eslint config (modified with 4 spaces)
* Declarative routing via using express-jefferson.
* Dynamic service discovery via express-mountie.
* Persistence via Mongoose
* Several OAuth Implementations
* Client-Side tests using jsdom
* Combined client/server coverage reporting
* React Client
* AngularJS Client 
   * Class-based services and controllers
   * Strict DI mode
   * Static template caching


## Getting Started

### Usage
```bash
> npm install generator-ats-node-webapp -g
> yo ats-node-webapp
```

### License
[Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0)

<sub>ATS ❤ Yeoman</sub>
