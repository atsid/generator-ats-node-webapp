[![Build Status](https://secure.travis-ci.org/atsid/generator-ats-node-webapp.png?branch=master)](https://travis-ci.org/atsid/generator-ats-node-webapp)
[![Code Climate](https://codeclimate.com/github/atsid/generator-ats-node-webapp/badges/gpa.svg)](https://codeclimate.com/github/atsid/generator-ats-node-webapp)
[![Test Coverage](https://codeclimate.com/github/atsid/generator-ats-node-webapp/badges/coverage.svg)](https://codeclimate.com/github/atsid/generator-ats-node-webapp/coverage)
[![Dependency Status](https://david-dm.org/atsid/generator-ats-node-webapp.svg)](https://david-dm.org/atsid/generator-ats-node-webapp)
[![Dev Dependency Status](https://david-dm.org/atsid/generator-ats-node-webapp/dev-status.svg)](https://david-dm.org/atsid/generator-ats-node-webapp)
# generator-ats-node-webapp

> A [Yeoman](http://yeoman.io) generator for generating NodeJS Web Applications 

The ats-node-webapp generator scaffolds a NodeJS web-application with normative standards for composing a high-quality application.
## Key Features
* Gulp build system.
* A RESTful API via Express.
* Declarative routing via using express-jefferson.
* Dynamic service discovery via express-mountie.
* MongoDB/Mongoose persistence
* Client-side tests using jsdom
* Client Implementations:
    * React 
    * AngularJS 
      * Class-based services and controllers
      * Strict DI mode
      * Static template caching
* Server Implementations:
    * RESTful ExpressJS Server
    * Thin Dev-Only Server
* OAuth Scaffolding
    * Facebook
    * Twitter
    * Github
    * Google

## Getting Started

### Prerequisites
  * [NodeJS](http://nodejs.org) - `brew install nodejs`
  * [Yeoman](http://yeoman.io) - `sudo npm install yo -g`
  * [MongoDB](http://mongodb.org) - `brew install mongodb`

### Usage
```bash
> npm install generator-ats-node-webapp -g
> yo ats-node-webapp
```

### Project Layout
```
generated_project
└───gulp/ (Build System)
    ├───tasks/ (task files, automatically included during build)
└───config/ (Application Configuration)
    ├───custom-environment-variables.coffee (Environment-Variable => Configuration Mapping)
    ├───default.coffee (Default configuration - always included as base layer)
    ├───<environment>.coffee (Environment-specific configuration)
└───scripts
    ├───npm/ (scripts executed by npm)
    ├───git/ (git hooks)
└───server    
    ├───components/ (application components, should be class-based, testable)
    ├───errors/ (custom error types, optionally contain an errorCode property to configure HTTP response codes)
    ├───initialization/ (server initialization scripts)
    ├───middleware/ (functions that are composed to define RESTful endpoints. These should interact with the domain, but not contain domain logic.)
    ├───persistence/ (mongoose setup)
        ├───models/ (mongoose models definitions using Mongoose-Organizer)
    ├───routers/ (RESTful endpoint definitions)
    ├───routers.spec/ (RESTful endpoint tests, separate folder because routers is scanned by express-mountie)
└───client (Web Client Implementation - e.g. React, Angular)
    ├───app.js (bundled by browserify)
    ├───assets/ (static assets)
    ├───styles/ (Sass)
```

### License
[Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0)

<sub>ATS ❤ Yeoman</sub>
