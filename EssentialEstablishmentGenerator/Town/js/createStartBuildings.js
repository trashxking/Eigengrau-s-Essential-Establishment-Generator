import { createAlchemist } from '../../Alchemist/js/createAlchemist'

setup.createStartBuildings = function (town) {
  const buildingTypes = {
    townSquare: setup.createTownSquare,
    tavern: setup.createTavern,
    alchemist: createAlchemist,
    GeneralStore: setup.createGeneralStore,
    smithy: setup.createSmithy,
    market: setup.createMarket,
    temple: setup.createTemple,
    docks: setup.createDocks
  }

  if (town.hasBrothel) {
    buildingTypes.brothel = setup.createBrothel
  }

  for (const [type, createBuilding] of Object.entries(buildingTypes)) {
    if (!town.buildings[type]) {
      town.buildings[type] = {}
    }
    console.log(type)
    const building = createBuilding(town)
    town.buildings[type][building.key] = building
  }

  const bakery = setup.goodsAndServices.default.create(town, 'bakery')
  town.buildings.bakery[bakery.key] = bakery

  const florist = setup.goodsAndServices.default.create(town, 'florist')
  town.buildings.florist[florist.key] = florist

  const tailor = setup.goodsAndServices.default.create(town, 'tailor')
  town.buildings.tailor[tailor.key] = tailor
  return town
}
