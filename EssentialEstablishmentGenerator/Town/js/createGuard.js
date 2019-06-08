import { createNPC } from "../../NPCGeneration/SetupNPC"
import { guardData } from "./guardData"

export function createGuard (town) {
  console.groupCollapsed(`creating the guard...`)
  // console.log(townName + ' is the townName passed to the guard.')
  const guard = {
    associatedTown: town.name,
    captain: createNPC(town, {
      dndClass: `fighter`,
      profession: `guard`,
      background: `soldier`
    }),
    passageName: `GuardOutput`,
    livery: `${guardData.primaryColours.seededrandom()} and ${guardData.secondaryColours.seededrandom()} livery adorned with an image of ${guardData.insignia.seededrandom()}`
  }

  const nameRoll = random(1, 8)
  console.log(`nameRoll is ${nameRoll}`)
  if (nameRoll === 1) {
    guard.name = `The ${guardData.name.group.seededrandom()} of ${town.name}`
  } else if (nameRoll === 2) {
    guard.name = `The ${town.name} ${guardData.name.group.seededrandom()}`
  } else if (nameRoll === 3) {
    guard.name = `The ${guardData.name.group.seededrandom()} of ${guardData.name.alternateAdjective.seededrandom()}`
  } else if (nameRoll === 4) {
    guard.name = `The ${guardData.name.adjective.seededrandom()} ${guardData.name.group.seededrandom()}`
  } else if (nameRoll === 5) {
    guard.name = `The ${guardData.name.adjective.seededrandom()} ${guardData.name.noun.seededrandom()}`
  } else if (nameRoll === 6) {
    guard.name = `The ${guardData.name.adjective.seededrandom()} ${guardData.name.noun.seededrandom()} of ${guardData.name.alternateAdjective.seededrandom()}`
  } else if (nameRoll === 7) {
    guard.name = `The ${guardData.name.adjective.seededrandom()} ${guardData.name.noun.seededrandom()} of ${town.name}`
  } else if (nameRoll === 8) {
    guard.name = `The ${guardData.name.group.seededrandom()} ${guardData.name.noun.seededrandom()} of ${town.name}`
  }
  console.log(`${guard.name} is the name of the guard.`)
  console.groupEnd()
  return guard
}
