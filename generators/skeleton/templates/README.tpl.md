TODO: Insert Build Status Badge
TODO: Insert Test Coverage Badge
TODO: Insert Static Analysis Badge
TODO: Insert Dependency Status Badge

# My Kickass Webapp<% if (server === 'full') { %>

## Live Server
    > NODE_ENV=<integration|production> npm start
<% } %>   
    
## Development Server
    > npm install
    > npm run develop
    
## Project Overview
    └───gulp/ (Build System)
        ├─── tasks.md - Build System documentation
        ├─── config.js - Build System Configuration
        ├─── tasks/ (task files, automatically included during build)<% if (server === 'full') { %>
    └───config/ (Configuration Management)
        ├───custom-environment-variables.coffee (Environment-Variable Mappings)
        ├───default.coffee (Default configuration - always included as base layer)
        ├───<environment>.coffee (Environment-specific configuration)<% } %>
    └───scripts
        ├───npm/ (scripts executed by npm)
        ├───git/ (git hooks)<% if (server === 'full') { %>
    └───server    
        ├───components/ (application components, should be class-based, testable)
        ├───errors/ (custom error types, optionally contain an errorCode property to configure HTTP response codes)
        ├───initialization/ (server initialization scripts)
        ├───middleware/ (functions that are composed to define RESTful endpoints. These should interact with the domain, but not contain domain logic.)
        ├───persistence/ (persistence layer)
        └──────models/ (model definitions)
        ├───routers/ (RESTful endpoint definitions)
        ├───routers.spec/ (RESTful endpoint tests, separate folder because routers is scanned by express-mountie)<% } %>
    └───client (Client Implementation)
        ├───app.js (bundling root - bundled by browserify)
        ├───assets/ (static assets)
        ├───styles/ (Sass entry-point)
    └───public - statically served directory containing processed client assets
    └───target - An output directory containing test and coverage reports
