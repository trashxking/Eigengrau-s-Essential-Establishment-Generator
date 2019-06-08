import { get, set, unset } from '../../src/engine/story'
import { listBox, button, pragma, replace } from '../../src/engine/html'

export function CreateScenario () {
  let scenario
  let currentSeason = get(`$town.currentSeason`)
  let scenarioType
  let rememberSeason
  let scenarioWeather

  const seasons = {
    summer: `Summer`,
    autumn: `Autumn`,
    winter: `Winter`,
    sprins: `Spring`,
    null: `No weather`
  }

  const selectSeason = value => {
    currentSeason = value
  }

  const scenarioTypes = {
    town: `Town Encounter`,
    forest: `Forest`,
    desert: `Desert`,
    mountain: `Mountain`,
    road: `Road`
  }

  const selectScenarioType = value => {
    scenarioType = value
  }

  const createScenario = () => {
    const _newNPC = get(`_newNPC`)
    const $town = get(`$town`)

    if (_newNPC) {
      unset(`$npcs.${_newNPC.key}`)
    }

    if (rememberSeason && rememberSeason !== currentSeason) {
      scenarioWeather.timer.temperature = 0
      scenarioWeather.timer.precipitation = 0
      scenarioWeather.timer.cloud = 0
    }

    rememberSeason = currentSeason

    if (currentSeason !== `null` && currentSeason !== $town.currentSeason) {
      set(`$town.currentSeason`, currentSeason)
    }

    if (scenario && scenarioWeather && currentSeason !== `null`) {
      scenarioWeather.timer.temperature -= 4
      scenarioWeather.timer.precipitation -= 4
      scenarioWeather.timer.cloud -= 4
      scenario = setup.misc[scenarioType].create($town)
      scenarioWeather = setup.createWeather($town, scenarioType, scenarioWeather, currentSeason)
    } else {
      scenario = setup.misc[scenarioType].create($town)
      if (currentSeason !== `null`) {
        scenarioWeather = setup.createWeather($town, scenarioType, ``, currentSeason)
      }
    }

    return pragma`${replace(`#scenario`, () => {
      if (currentSeason !== `null`) {
        return `${scenarioWeather.readout.full} ${scenario}`
      }
      return scenario
    })}`
  }

  return pragma`${listBox(seasons, selectSeason, currentSeason)}${listBox(scenarioTypes, selectScenarioType)} -- ${button(`Create scenario`, createScenario)}
<div id="scenario"><<if def $scenario>><<if $currentSeason !== "null">>$scenarioWeather.readout.full<</if>> $scenario<</if>></div>
`
}
