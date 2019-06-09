import { set, get } from '../../src/engine/story'
import { link } from '../../src/engine/html'
import { slugify } from '../../src/engine/utils'

export function BuildingsList () {
  const result = []

  for (const [buildingType, townBuildings] of Object.entries(get(`$town.buildings`))) {
    let previousBuilding

    for (const [key, building] of Object.entries(townBuildings)) {
      building.tooltip = `tip-${slugify(building.name)}-${Math.floor(Number(randomFloat(1).toString(16)))}`

      if (previousBuilding && previousBuilding.road === building.road) {
        result.push(either(`Also on _building.road is `, `Down from _previousBuilding.name is `, `Nearby is `))
      } else {
        result.push(`${either(`On `, `Along `, `Over on `)} ${building.road} is `)
      }

      if (building.needsWordNoun) {
        result.push(`the ${building.wordNoun}`)
      }

      // eslint-disable-next-line no-loop-func
      const setSelected = () => {
        set(`$selected`, { BuildingType: buildingType, key, building })
        set(`$currentPassage`, building)

        if (settings.showSliders) {
          // <<goto building.initPassage>>
        } else {
          // <<goto building.passageName>>
        }
      }

      result.push(`\
        <span id="${building.tooltip}" class="tip">
          ${link(building.name, setSelected)}
        </span>
      `)

      setup.buildingTooltip(building.tooltip, building)
      setup.tippy(`.btn`)

      previousBuilding = building
    }
  }

  return result
}
