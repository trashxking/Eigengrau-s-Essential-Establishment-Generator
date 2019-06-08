import { createBuilding } from "../../Buildings/createBuilding"
import { defineRollDataGetter } from "../../Tools/defineRollDataGetter"
import { createNPC } from "../../NPCGeneration/SetupNPC"
import { createGeneralStoreName } from "./createGeneralStoreName"
import { GeneralStoreData } from "./GeneralStoreData"

export function createGeneralStore (town, opts = {}) {
  const GeneralStore = (opts.newBuilding || createBuilding)(town, `GeneralStore`)
  console.groupCollapsed(`General Store loading...`)
  GeneralStore.shopkeep = (opts[`newShopkeep`] || createNPC)(town, {
    profession: `merchant`,
    mundane: [`pliers`, `tins`, `twine`, `cups`, `spoons`, `pans`, `chairs`, `cushions`],
    greeting: [`nods at you`, `welcomes you warmly`, `smiles and greets you`, `raises a hand with a wave`, `checks you out for just a moment before smiling at you`],
    owner: [`owner`, `caretaker`, `proud owner`, `proprietor`, `current owner`, `manager`, `assistant manager`, `acting manager`].seededrandom()
  })
  Object.assign(GeneralStore, {
    note: GeneralStoreData.get.note(GeneralStore),
    wordNoun: [`general store`, `shop`].seededrandom(),
    crud: GeneralStoreData.crud,
    notableFeature: `wide range of goods on sale`,
    passageName: `GeneralStoreOutput`,
    initPassage: `InitGeneralStore`,
    buildingType: `GeneralStore`
  })

  createGeneralStoreName(town, GeneralStore)
  GeneralStore.wealth = ``
  GeneralStore.size = ``
  GeneralStore.cleanliness = ``
  GeneralStore.expertise = ``
  setup.GeneralStoreModifiers(town, GeneralStore)

  const rollDataVariables = [`wealth`, `size`, `cleanliness`, `expertise`]
  rollDataVariables.forEach(function (propName) {
    defineRollDataGetter(GeneralStore, GeneralStoreData.rollData, propName)
  })
  // setup.GeneralStoreRenders(GeneralStore)
  console.log(GeneralStore)
  // setup.townBinder(town, GeneralStore, 'GeneralStore')
  console.groupEnd()
  return GeneralStore
}
