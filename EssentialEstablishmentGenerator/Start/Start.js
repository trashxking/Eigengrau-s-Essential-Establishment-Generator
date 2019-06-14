import { pragma, image, replace, button, listBox, link, tip } from '../../src/engine/html'
import { get, set } from '../../src/engine/story'
import banner from '../Resources/banner.svg'

import { CreateScenario } from '../World/CreateScenario'
import { Popup } from './Popup'
import { BuildingsList } from './BuildingsList'

const TownOutput = () => {}
const goTo = (...args) => {}

set(`$town`, {})
set(`$newBuilding`, {})
set(`$versionNumber`, `0.0.0`)

export function Start () {
  const $town = get(`$town`)
  const $newBuilding = get(`$newBuilding`)

  const createBuilding = () => {
    console.log(`Creating a new ${$newBuilding}`)
    setup.createNewBuilding($town, $newBuilding)
    replace(`#buildings`, BuildingsList)
  }

  const newBuildingsOptions = Object.keys(setup.buildingTypes).reduce((options, type) => {
    options[type] = type
    return options
  }, {})

  return pragma`\
${image(banner)}

<h3>Quick scenario generator</h3>
${CreateScenario()}

<h3>The $town.type of $town.name</h3>
${tip(`Find the overview of the town and its sociopolitical structure here!`,
    link(`Description of ${$town.name}`, () => {
      set(`$currentPassage`, $town)
      goTo(TownOutput)
    })
  )}

${listBox(newBuildingsOptions, value => set(`$newBuilding`, value))} -- ${button(`Create new building`, createBuilding)}
<span id="buildings">${BuildingsList()}</span>

${Popup()}`
}
