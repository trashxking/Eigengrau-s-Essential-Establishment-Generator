import { createBuilding } from "../Buildings/createBuilding"
import { defineRollDataGetter } from "../Tools/defineRollDataGetter"
import { docksData } from "./docks"

export function createDocks (town, opts = {}) {
  const docks = (opts.newBuilding || createBuilding)(town, `docks`)
  Object.assign(docks, {
    notableFeature: docksData.notableFeature.seededrandom(),
    notice: docksData.notice.seededrandom(),
    passageName: `DocksOutput`,
    initPassage: `DocksOutput`,
    buildingType: `docks`,
    needsWordNoun: false,
    wordNoun: [`docks`, `pier`, `wharf`, `dockyard`, `shipyard`, `quay`, `staithe`, `marina`].seededrandom(),
    ships: {},
    typePool: docksData.ships.typePool
  })

  docks.name = [`the${[` Old `, ` New `, ` `, ` `, ` `].seededrandom()}${[`${town.name} `, `${town.name} `, ` `, ` `, ` `].seededrandom()}${docks.wordNoun.toUpperFirst()}`].seededrandom()

  // docks.wealth = ''
  docks.activity = ``
  docks.size = ``
  docks.cleanliness = ``

  const rollDataVariables = [`size`, `cleanliness`, `activity`]
  rollDataVariables.forEach(function (propName) {
    defineRollDataGetter(docks, docksData.rollData, propName)
  })

  docks.sizeDescriptive = ``
  docks.cleanlinessDescriptive = ``
  docks.activityDescriptive = ``

  defineRollDataGetter(docks, docksData.rollData, `sizeDescriptive`, `size`, 2)
  defineRollDataGetter(docks, docksData.rollData, `cleanlinessDescriptive`, `cleanliness`, 2)
  defineRollDataGetter(docks, docksData.rollData, `activityDescriptive`, `activity`, 2)

  docksData.ships.create(town, docks)

  return docks
}
