class NyanCatController {
  constructor(nyanService) {
    this.nyanCatSource = nyanService.getNyanSource();
  }
}

NyanCatController.$inject = ['NyanService'];
module.exports = NyanCatController;
