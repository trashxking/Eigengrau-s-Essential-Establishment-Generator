import { createBuilding } from "../Buildings/createBuilding"

export function createMarket (town, opts = {}) {
  const market = (opts.newBuilding || createBuilding)(town, `market`)

  Object.assign(market, {
    name: [`The Markets`, `The Markets of ${town.name}`, `The ${town.name} Bazaar`].seededrandom(),
    associatedTown: town.name,
    initPassage: `MarketOutput`,
    passageName: `MarketOutput`,
    buildingType: `market`,
    wordNoun: `market`,
    needsWordNoun: false,
    location: setup.market.location.seededrandom(),
    size: setup.market.size.seededrandom(),
    cleanliness: setup.market.cleanliness.seededrandom(),
    draw: setup.market.draw.seededrandom(),
    organisation: setup.market.organisation.seededrandom()
  })
  market.notableFeature = market.draw
  // setup.townBinder(town, market, 'market')
  return market
}
