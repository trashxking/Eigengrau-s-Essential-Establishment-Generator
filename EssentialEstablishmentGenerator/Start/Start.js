import { pragma, image, replace, button, listBox, link, tip, replaceable } from '../../src/engine/html'
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
  const createBuilding = () => {
    console.log(`Creating a new ${get('$newBuilding')}`)
    setup.createNewBuilding(get('$town'), get('$newBuilding'))
    return replace('buildings', BuildingsList)
  }

  const newBuildingsOptions = Object.keys(setup.buildingTypes).reduce((options, type) => {
    options[type] = type
    return options
  }, {})

  return pragma`\
${image(banner)}

<h3>Quick Scenario Generator</h3>
${CreateScenario()}

<h3>The ${get('$town').type.toUpperFirst()} of $town.name</h3>
${tip('Find the overview of the town and its sociopolitical structure here!',
    link(`Description of ${get('$town').name}`, () => {
      set(`$currentPassage`, get('$town'))
      goTo(TownOutput)
    })
  )}

${listBox(newBuildingsOptions, value => set('$newBuilding', value))} -- ${button('Create New Building', createBuilding)}
${replaceable('buildings', BuildingsList())}

${Popup()}`
}
