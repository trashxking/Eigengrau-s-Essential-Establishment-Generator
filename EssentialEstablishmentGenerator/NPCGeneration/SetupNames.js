import { npcData } from "./npcData"

setup.createName = function (parameters) {
  console.log(`Returning a name!`)
  return npcData.raceTraits[parameters.race || `human`].genderTraits[parameters.gender || `man`][parameters.firstOrLast || `firstName`].seededrandom().toUpperFirst()
}
