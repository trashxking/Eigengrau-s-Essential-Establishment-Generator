import { npcData } from "./npcData"

setup.createBackground = function (npc) {
  console.log(`assigning background traits to ${npc.name}...`)
  let backgroundOrigin
  let bond
  let ideal
  if (typeof npcData.backgroundTraits[npc.background] !== `undefined`) {
    backgroundOrigin = Array.isArray(npcData.backgroundTraits[npc.background].backgroundOrigin)
      ? npcData.backgroundTraits[npc.background].backgroundOrigin.seededrandom()
      : npcData.backgroundTraits[`commoner`].backgroundOrigin.seededrandom()
    bond = Array.isArray(npcData.backgroundTraits[npc.background].bond)
      ? npcData.backgroundTraits[npc.background].bond.seededrandom()
      : npcData.backgroundTraits[`commoner`].bond.seededrandom()
    ideal = Array.isArray(npcData.backgroundTraits[npc.background].ideal)
      ? npcData.backgroundTraits[npc.background].ideal.seededrandom()
      : npcData.backgroundTraits[`commoner`].ideal.seededrandom()
  } else {
    console.log(`${npc.name}'s background of ${npc.background} was not valid.`)
    backgroundOrigin = npcData.backgroundTraits[`commoner`].backgroundOrigin.seededrandom()
    bond = npcData.backgroundTraits[`commoner`].bond.seededrandom()
  }
  npc.backgroundOrigin = npc.backgroundOrigin || backgroundOrigin
  npc.bond = npc.bond || bond
  npc.ideal = npc.ideal || ideal
  // npc.wealth += dice(2, 50)
  // npc.wealth += typeof npcData.classTraits[npc.background].wealth === 'function'
  //   ? npcData.backgroundTraits[npc.background].wealth()
  //   : dice(2, 50)
  //
  // npc.knownLanguages += typeof npcData.classTraits[npc.background].knownLanguages === 'function'
  //   ? npcData.backgroundTraits[npc.background].knownLanguages()
  //   : dice(2, 50)

  // var getLanguages = function (npc) {
  //   if (random(1, 100) > 95) {
  //     return [(npcData.standardLanguages + npcData.exoticLanguages) - npc.knownLanguages].pluck()
  //   }
  // }

  return npc
}
