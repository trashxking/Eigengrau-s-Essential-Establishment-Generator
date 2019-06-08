import { get, set, unset } from '../../src/engine/story'
import { listBox, button, pragma, replace, replaceable } from '../../src/engine/html'
import { createWeather } from '../Town/Weather/js/createWeather'
import { misc } from './miscData'

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

  const getScenarioText = () => {
    if (currentSeason !== `null` && scenarioWeather) {
      return `${scenarioWeather.readout.full} ${scenario}`
    }
    return scenario
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
      scenario = misc[scenarioType].create($town)
      scenarioWeather = createWeather($town, scenarioType, scenarioWeather, currentSeason)
    } else {
      scenario = misc[scenarioType].create($town)
      if (currentSeason !== `null`) {
        scenarioWeather = createWeather($town, scenarioType, ``, currentSeason)
      }
    }

    return pragma`${replace(`#scenario`, getScenarioText)}`
  }

  return pragma`${listBox(seasons, selectSeason, currentSeason)}${listBox(scenarioTypes, selectScenarioType)} -- ${button(`Create scenario`, createScenario)}${replaceable(`scenario`, getScenarioText)}`
}
