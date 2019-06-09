import { npcData } from "./npcData"

setup.createClass = function (npc) {
  console.log(`assigning class traits to ${npc.name}...`)
  let dndClassOrigin
  let background
  let classWeapon

  if (npc.hasClass !== false && typeof npcData.classTraits[npc.dndClass] !== `undefined`) {
    dndClassOrigin = Array.isArray(npcData.classTraits[npc.dndClass].dndClassOrigin)
      ? npcData.classTraits[npc.dndClass].dndClassOrigin.seededrandom()
      : Array.isArray(npcData.professionTraits[npc.profession].dndClassOrigin)
        ? npcData.professionTraits[npc.profession].dndClassOrigin.seededrandom()
        : `My circumstances kept me from doing more than being a ${npc.profession}`
    background = Array.isArray(npcData.classTraits[npc.dndClass].background)
      ? npcData.classTraits[npc.dndClass].background.seededrandom()
      : Array.isArray(npcData.professionTraits[npc.profession].background)
        ? npcData.professionTraits[npc.profession].background.seededrandom()
        : `commoner`
    classWeapon = Array.isArray(npcData.classTraits[npc.dndClass].weapon)
      ? npcData.classTraits[npc.dndClass].weapon.seededrandom()
      : Array.isArray(npcData.professionTraits[npc.profession].weapon)
        ? npcData.professionTraits[npc.profession].weapon.seededrandom()
        : `a dagger`
  } else if (npc.hasClass === false && typeof npcData.professionTraits[npc.profession] !== `undefined`) {
    dndClassOrigin = Array.isArray(npcData.professionTraits[npc.profession].dndClassOrigin)
      ? npcData.professionTraits[npc.profession].dndClassOrigin.seededrandom()
      : `My circumstances kept me from doing more than being a ${npc.profession}`
    background = Array.isArray(npcData.professionTraits[npc.profession].background)
      ? npcData.professionTraits[npc.profession].background.seededrandom()
      : `commoner`
    classWeapon = Array.isArray(npcData.professionTraits[npc.profession].weapon)
      ? npcData.professionTraits[npc.profession].weapon.seededrandom()
      : `a dagger`
  } else {
    console.log(`${npc.name} the ${npc.dndClass} did not have a valid class.`)
    dndClassOrigin = `My circumstances kept me from doing more than being a ${npc.profession}`
    background = `commoner`
    classWeapon = `a dagger`
  }

  // var checkValidity = function (npc, target) {
  //   if (npc.hasClass !== false && typeof npcData.classTraits[npc.dndClass] !== 'undefined') {
  //     return npcData.classTraits[npc.dndClass][target].seededrandom()
  //   } else if (npc.hasClass === false && typeof npcData.professionTraits[npc.profession] !== 'undefined') {
  //     return npcData.professionTraits[npc.profession][target].seededrandom()
  //   } else {
  //     return
  //   }
  // }
  npc.dndClassOrigin = npc.dndClassOrigin || dndClassOrigin
  npc.background = npc.background || background
  npc.weapon = npc.weapon || classWeapon

  // npc.wealth += typeof npcData.classTraits[npc.dndClass].wealth === 'function'
  //   ? npcData.classTraits[npc.dndClass].wealth()
  //   : dice(2, 50)

  return npc
}
