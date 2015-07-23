class WelcomeController {
    constructor(welcomeTarget) {
        this.target = welcomeTarget;
    }
}

WelcomeController.$inject = ['welcomeTarget'];
module.exports = WelcomeController;
