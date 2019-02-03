console.clear();
class Fleet {
  constructor () {
    this.ninjas = [];
  }
  addNinja (id, name, fleet) {
    var ninja = {id, name, fleet};
    this.ninjas.push(ninja)
    return ninja;
  }

  removeNinja (id) {
    let ninja = this.getNinja(id);
    if(ninja) {
      this.ninjas = this.ninjas.filter((ninja) => ninja.id !== id);
    }
    return ninja;
  }

  getNinja (id) {
    return this.ninjas.filter((ninja) => ninja.id === id)[0];
  }

  getNinjaList (fleet) {
    var ninjas = this.ninjas.filter((ninja) => ninja.fleet === fleet);
    return ninjas.map((ninja) =>  ninja.name );
  }
 };
module.exports = { Fleet };