import { createAlchemist } from '../../Alchemist/js/createAlchemist'
import { createGeneralStore } from '../../GeneralStore/JS/createGeneralStore'
import { createSmithy } from '../../Blacksmith/JS/createSmithy'
import { createMarket } from '../../MiniEstablishments/createMarket'
import { createDocks } from '../../Docks/createDocks'
import { createBrothel } from '../../MiniEstablishments/createBrothel'
import { goodsAndServices } from '../../Buildings/goodsAndServices'

export function createStartBuildings (town) {
  const buildingTypes = {
    townSquare: setup.createTownSquare,
    tavern: setup.createTavern,
    alchemist: createAlchemist,
    GeneralStore: createGeneralStore,
    smithy: createSmithy,
    market: createMarket,
    temple: setup.createTemple,
    docks: createDocks
  }

  if (town.hasBrothel) {
    buildingTypes.brothel = createBrothel
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
    const bakery = goodsAndServices.default.create(town, `bakery`)
    town.buildings.bakery[bakery.key] = bakery
  }

  if (town.population > 1000 || town.roll.wealth > 70) {
    const florist = goodsAndServices.default.create(town, `florist`)
    town.buildings.florist[florist.key] = florist
  }

  if (town.population > 600 || town.roll.wealth > 60) {
    const tailor = goodsAndServices.default.create(town, `tailor`)
    town.buildings.tailor[tailor.key] = tailor
  }

  if (town.population > 400 || town.roll.wealth > 40) {
    const butcher = goodsAndServices.default.create(town, `butcher`)
    town.buildings.butcher[butcher.key] = butcher
  }

  if (town.population > 700 || town.roll.wealth > 60) {
    const cobbler = goodsAndServices.default.create(town, `cobbler`)
    town.buildings.cobbler[cobbler.key] = cobbler
  }

  return town
}
