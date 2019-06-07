import { randomValue } from '../../../src/engine/rolls'
import { createBuilding } from '../../Buildings/createBuilding'
import { defineRollDataGetter } from "../../Tools/defineRollDataGetter"

import { alchemistData } from './alchemistData'
import { alchemistModifiers } from './alchemistModifiers'
import { createAlchemistName } from './createAlchemistName'
import { createChemist } from './createChemist'

/**
 * @typedef {ReturnType<typeof createAlchemist>} Alchemist
 */

export function createAlchemist (town, opts = {}) {
  const alchemist = (opts.newBuilding || createBuilding)(town, `alchemist`)
  console.groupCollapsed(`Alchemist loading...`)
  Object.assign(alchemist, {
    chemist: (opts[`newChemist`] || createChemist)(town),
    wordNoun: randomValue([`alchemist`, `potion shop`, `apothecary`, `alchemist`]),
    associatedTown: town.name,
    passageName: `AlchemistOutput`,
    initPassage: `InitAlchemist`,
    buildingType: `alchemist`,
    notableFeature: randomValue([`its love potions`, `its herbal remedies`, `its magical potions`, `its wonderful tonics`, `its fantastic ointments`])
  })

  alchemist.name = createAlchemistName(alchemist.chemist.firstName)
  alchemist.size = ``
  alchemist.cleanliness = ``
  alchemist.wealth = ``
  alchemist.expertise = ``

  const rollDataVariables = [`wealth`, `size`, `cleanliness`, `expertise`]
  for (const propName of rollDataVariables) {
    defineRollDataGetter(alchemist, alchemistData.rollData, propName)
  }

  alchemistModifiers(alchemist)

  console.groupEnd()
  return alchemist
}
