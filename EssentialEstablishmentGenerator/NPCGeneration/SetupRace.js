import { bmiDescriptions } from "./bmiDescriptions"
import { closestMatch } from "../Tools/closestMatch"
import { npcData } from "./npcData"

setup.createRace = function (npc) {
  console.log(`assigning racial traits to ${npc.name}...`)
  if (random(1, 100) >= npcData.raceTraits[npc.race].genderTraits[npc.gender].beardProbability) {
    npc.beard = npcData.raceTraits[npc.race].beard.seededrandom()
  }
  console.log(`base height: ${npcData.raceTraits[npc.race].genderTraits[npc.gender].baseHeight}`)
  npc.heightRoll = npcData.raceTraits[npc.race].genderTraits[npc.gender].baseHeight + npcData.raceTraits[npc.race].genderTraits[npc.gender].heightModifier()
  npc.weightRoll = npcData.raceTraits[npc.race].genderTraits[npc.gender].baseWeight + (npcData.raceTraits[npc.race].genderTraits[npc.gender].heightModifier() * npcData.raceTraits[npc.race].genderTraits[npc.gender].weightModifier())
  npc.bmi = (Math.trunc((npc.weightRoll / (npc.heightRoll * npc.heightRoll)) * npcData.raceTraits[npc.race].bmiModifier))
  npc.weight = npc.weight || closestMatch(bmiDescriptions, `weight`, `bmi`, `muscleMass`, npc.bmi, npc.muscleMass)

  npc.height = npcData.heightChart.find(function (descriptor) {
    return descriptor[0] <= npc.heightRoll
  })[1]

  return npc
}
