import { toUpperFirst } from "../../../src/engine/utils"

export function createNewBuilding (town, buildingType, opts) {
  if (!town.buildings[buildingType]) {
    town.buildings[buildingType] = {}
  }
  const building = setup[`create${toUpperFirst(buildingType)}`](town, opts)
  town.buildings[buildingType][building.key] = building
  return town
}
