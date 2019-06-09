import { pragma, linkAppend } from '../../src/engine/html'
import { get } from '../../src/engine/story'

export function ChemistTalk () {
  const $chemist = get(`$chemist`)
  const $brew = get(`$brew`)

  return pragma`${$chemist.firstName} looks ${$chemist.currentMood.seededrandom()}, and idly shifts a box of ${either($chemist.ingredients)} as ${$chemist.heshe} talks. The ${$chemist.raceNote} ${$chemist.chitchat.seededRandom()} as you peruse the shop. ${$chemist.firstName} tells you that ${$chemist.heshe} is working on a ${$brew.potionPurpose}, and points to the ${linkAppend(`${$brew.containerDescription}.`, `Looking inside the ${$brew.vesselType}, you see a ${$brew.liquidDescription} bubbling away`)}.`
}
