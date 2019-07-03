import { link, replace, linkReplace, pragma, replaceable } from '../../src/engine/html'
import { set, get, unset } from '../../src/engine/story'

import { ChemistTalk } from './ChemistTalk'

const TownMicroEventsOutput = () => ``
const RandomPotion = () => ``
const AlchemistSell = () => ``

export function AlchemistOutput () {
  set(`$brew`, setup.createAlchemy({ type: `brewing potion` }))

  unset(`$selectedBuilding`)

  const $town = get(`$town`)

  const $alchemist =
    $town.buildings.alchemist[get(`$selected`).key] ||
    $town.buildings.alchemist[get(`$currentPassage`).key]

  set(`$alchemist`, $alchemist)

  const $chemist = set(`$chemist`, get(`$npcs`)[$alchemist.chemist.key])

  function generatePlothook () {
    const $chemistPlot = set(`$chemistPlot`, setup.alchemistMission($town))

    return replace(`#chemistMission`, pragma`${either([`When you say that you're adventurers, ${$chemist.hisher} ${$chemist.eyes} eyes light up, and ${$chemist.heshe} says`, `You chat for a while, and then ${$chemist.firstName} says `, `You discuss business, and when you talk about your adventures, ${$chemist.firstName} asks `])} ${$chemistPlot}`)
  }

  return pragma`<h1>${$alchemist.name}</h1>${TownMicroEventsOutput()}<span class="firstcharacter">Y</span>ou enter ${$alchemist.name} a ${$alchemist.structure.alchemistDescriptor}. ${setup.closestMatch(setup.alchemist.get.lookAround($alchemist), 'note', 'cleanliness', 'wealth', $alchemist.roll.cleanliness, $alchemist.roll.wealth)} There is a chemist behind the shop counter currently ${$chemist.idle.seededrandom()}.

<h3>Chemist</h3>
The ${$chemist.weight} chemist ${either($chemist.greeting)} ${either('when you come inside', 'after finishing with another customer', 'as soon as you come through the door', 'when you come up to the counter', 'while you look around')}. ${$chemist.heshe.toUpperFirst()} introduces ${$chemist.himherself} as <<profile $chemist>>, the ${$chemist.owner} of the shop, and asks what ${$chemist.heshe} can do for you.
${linkReplace(`<h4>Talk with ${$chemist.name}</h4>`, () => `<h3>${$chemist.name}</h3>${ChemistTalk()}`)}
${link(`<h4>Generate plothook</h4>`, generatePlothook)}${replaceable('chemistMission')}
${RandomPotion()}
${AlchemistSell()}`
}
