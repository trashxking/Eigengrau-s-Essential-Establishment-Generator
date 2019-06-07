export function createNewBuilding (town, buildingType, opts) {
  if (!town.buildings[buildingType]) {
    town.buildings[buildingType] = {}
  }
  const building = setup[`create${buildingType.toUpperFirst()}`](town, opts)
  town.buildings[buildingType][building.key] = building
  return town
}
