module.exports = [() => {
  return {
    restrict: 'E',
    scope: {}, // Prefer Isolate Scopes
    templateUrl: '/welcome/nyan_cat/nyan_cat.html',
    controller: 'NyanCatController as ctrl',
  };
}];
