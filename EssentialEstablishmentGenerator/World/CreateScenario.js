import { get, set } from '../../src/engine/story'
import { listBox } from '../../src/engine/html'

export function CreateScenario () {
  const $currentSeason = set(`$currentSeason`, get(`$town.currentSeason`))

  const selectSeason = value => {
    set(`$currentSeason`, value)
  }

  const seasons = {
    summer: `Summer`,
    autumn: `Autumn`,
    winter: `Winter`,
    sprins: `Spring`,
    null: `No weather`
  }

  return `\
${listBox(seasons, selectSeason, $currentSeason)}<<listbox "$scenarioType">><<option "Town Encounter" "town">><<option "Forest" "forest">><<option "Desert" "desert">><<option "Mountain" "mountain">><<option "Road" "road">><</listbox>><<button "Create scenario">>
<<if def _newNPC>>
  <<run delete $npcs[_newNPC.key]>>
<</if>>
<<if def _rememberSeason && _rememberSeason !== $currentSeason>>
    <<set $scenarioWeather.timer.temperature to 0>>
    <<set $scenarioWeather.timer.precipitation to 0>>
    <<set $scenarioWeather.timer.cloud to 0>>
<</if>>
<<set _rememberSeason to $currentSeason>>
<<if $currentSeason !== "null" && $currentSeason !== $town.currentSeason>>
    <<set $town.currentSeason to $currentSeason>>
<</if>>
<<if def $scenario && $scenarioWeather && $currentSeason !==  "null">>
    <<set $scenarioWeather.timer.temperature -= 4>>
    <<set $scenarioWeather.timer.precipitation -= 4>>
    <<set $scenarioWeather.timer.cloud -= 4>>
    /* <<set $scenario to setup.createEncounter($town, $scenarioType)>> */
    <<set $scenario to setup.misc[$scenarioType].create($town)>>
    <<set _scenarioWeather to setup.createWeather($town, $scenarioType, $scenarioWeather, $currentSeason)>>
    <<set $scenarioWeather to _scenarioWeather>>
  <<else>>
    <<set $scenario to setup.misc[$scenarioType].create($town)>>
    /* <<set $scenario to setup.createEncounter($town, $scenarioType)>> */
    <<if $currentSeason !== "null">>
      <<set $scenarioWeather to setup.createWeather($town, $scenarioType, '', $currentSeason)>>
    <</if>>
<</if>>
<<replace "#scenario">><<if $currentSeason !== "null">>$scenarioWeather.readout.full<</if>> $scenario<</replace>><</button>>
<div id="scenario"><<if def $scenario>><<if $currentSeason !== "null">>$scenarioWeather.readout.full<</if>> $scenario<</if>></div>
`
}
