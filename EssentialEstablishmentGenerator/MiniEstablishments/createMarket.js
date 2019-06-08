import { createBuilding } from "../Buildings/createBuilding"
import marketData from "./marketData"

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
    location: marketData.location.seededrandom(),
    size: marketData.size.seededrandom(),
    cleanliness: marketData.cleanliness.seededrandom(),
    draw: marketData.draw.seededrandom(),
    organisation: marketData.organisation.seededrandom()
  })
  market.notableFeature = market.draw
  // setup.townBinder(town, market, 'market')
  return market
}
