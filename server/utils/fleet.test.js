const expect = require('expect');
const {Fleet} = require('./fleet');

describe('Fleet', () => {
  var ninjas;
  beforeEach(() => {
    fleet = new Fleet();
    fleet.ninjas = [{
      id: 1,
      name: 'mike',
      fleet: 'test'
    },
    {
      id: 2,
      name: 'jen',
      fleet: 'huroko'
    },
    {
      id: 3,
      name: 'drac',
      fleet: 'test'
    }];
  });
  it('should add new ninja', () => {
    var fleet = new Fleet();
    var ninja = {
      id: 1,
      name: 'nikko',
      fleet: 'test'
    }
    var resNinja = fleet.addNinja(ninja.id,ninja.name,ninja.fleet);
    expect(fleet.ninjas).toEqual([ninja]);
  })

  it('should remove a ninja', () => {
    let ninjaId = 1;
    let ninja = fleet.removeNinja(ninjaId);
    expect(ninja.id).toBe(ninjaId);
    expect(fleet.ninjas.length).toBe(2);
  })

  it('should not remove a user', () => {
    let ninjaId = 99;
    let ninja = fleet.removeNinja(ninjaId);
    expect(ninja).toBe(undefined);
    expect(fleet.ninjas.length).toBe(3);
  })

  it('should find a user', () => {
    let ninjaId = 1;
    let ninja = fleet.getNinja(ninjaId);
    expect(ninja.id).toBe(ninjaId);
  })

  it('should not find a user', () => {
    let ninjaId = 99;
    let ninja = fleet.getNinja(ninjaId);
    expect(ninja).toBe(undefined);
  })

  it('should return names for test fleet', () => {
    var ninjas = fleet.getNinjaList('test');
    expect(ninjas).toEqual(['mike', 'drac']);
  });
  it('should return names for huroko fleet', () => {
    var ninjas = fleet.getNinjaList('huroko');
    expect(ninjas).toEqual(['jen']);
  });
})