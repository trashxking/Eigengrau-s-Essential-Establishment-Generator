import { createAlchemist } from '../../Alchemist/js/createAlchemist'
import { createSmithy } from '../../Blacksmith/JS/createSmithy'
import { createDocks } from '../../Docks/createDocks'

setup.createStartBuildings = function (town) {
  const buildingTypes = {
    townSquare: setup.createTownSquare,
    tavern: setup.createTavern,
    alchemist: createAlchemist,
    GeneralStore: setup.createGeneralStore,
    smithy: createSmithy,
    market: setup.createMarket,
    temple: setup.createTemple,
    docks: createDocks
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

  if (town.population > 100 || town.roll.wealth > 40) {
    const bakery = setup.goodsAndServices.default.create(town, `bakery`)
    town.buildings.bakery[bakery.key] = bakery
  }

  if (town.population > 1000 || town.roll.wealth > 70) {
    const florist = setup.goodsAndServices.default.create(town, `florist`)
    town.buildings.florist[florist.key] = florist
  }

  if (town.population > 600 || town.roll.wealth > 60) {
    const tailor = setup.goodsAndServices.default.create(town, `tailor`)
    town.buildings.tailor[tailor.key] = tailor
  }

  if (town.population > 400 || town.roll.wealth > 40) {
    const butcher = setup.goodsAndServices.default.create(town, `butcher`)
    town.buildings.butcher[butcher.key] = butcher
  }

  if (town.population > 700 || town.roll.wealth > 60) {
    const cobbler = setup.goodsAndServices.default.create(town, `cobbler`)
    town.buildings.cobbler[cobbler.key] = cobbler
  }

  return town
}
