import { createBuilding } from "../Buildings/createBuilding"
import { defineRollDataGetter } from "../Tools/defineRollDataGetter"
import { createNPC } from "../NPCGeneration/SetupNPC"
import { brothelData } from "./brothelData"

setup.createBrothel = function (town, tavern) {
  console.log(`Creating a brothel...`)
  const brothel = createBuilding(town, `brothel`)
  // if (tavern.hasBrothel) {
  //   brothel = tavern
  // } else {
  //   brothel = createBuilding(town, 'brothel')
  // }
  Object.assign(brothel, {
    name: brothelData.name.seededrandom(),
    passageName: `BrothelOutput`,
    initPassage: `BrothelOutput`,
    buildingType: `brothel`,
    wordNoun: [`brothel`, `whorehouse`, `gentleman's club`, `bordello`, `cathouse`, `house of ill-repute`, `massage parlor`, `den of vice`].seededrandom(),
    specialty: brothelData.specialty.seededrandom(),
    talk: brothelData.talk.seededrandom(),
    rumour: brothelData.rumour.seededrandom(),
    notice: brothelData.notice.seededrandom(),
    idle: brothelData.idle.seededrandom(),
    owner: Object.keys(brothelData.pimp).seededrandom()
  })
  brothel.notableFeature = `${brothel.specialty} and being owned by ${brothel.owner}`

  brothel.wealth = ``
  brothel.size = ``
  brothel.cleanliness = ``

  const rollDataVariables = [`wealth`, `size`, `cleanliness`]
  rollDataVariables.forEach(function (propName) {
    defineRollDataGetter(brothel, brothelData.rollData, propName)
  })
  // as title is already a value in npcData.js the title for the brothel owner appears as altTitle
  brothel.pimp = createNPC(town, Object.assign(brothelData.pimp[brothel.owner]), {
    isShallow: true,
    hasClass: false
  })

  brothel.pimp.greeting = [
    `nods at you`, `welcomes you warmly`, `smiles, greets you`, `raises a hand with a wave`, `sizes you up, before $pimp.heshe nods at you`, `checks you out for just a moment before smiling at you`, `waves slightly in your direction`, `gives you you a slight nod`, `turns your way`, `frowns, but greets you just the same`
  ]
  console.log(brothel)
  // setup.townBinder(town, brothel, 'brothel')
  return brothel
}
