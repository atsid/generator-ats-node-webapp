module.exports = {
    packageJson() {
        this.appendPackageJson({
            "scripts": {
                "test": "gulp",
                "develop": "gulp develop",
            },
            "devDependencies": {
                "gulp": "^3.9.0",
                "gulp-empty": "^0.1.1",
                "gulp-eslint": "^0.15.0",
                "gulp-exit": "0.0.2",
                "gulp-istanbul": "^0.10.0",
                "gulp-mocha": "^2.1.3",
                "gulp-nodemon": "^2.0.3",
                "gulp-sass": "^2.0.4",
                "gulp-util": "^3.0.6",
                "run-sequence": "^1.1.1",
                "vinyl-buffer": "^1.0.0",
                "vinyl-source-stream": "^1.1.0",
                "isparta": "^3.0.3",
            }
        });
    }
};
