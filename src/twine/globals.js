import { clone } from '../engine/utils'

window.setup = {}

window.version = {
  title: `SugarCube`,
  major: 2,
  minor: 19
}

window.Macro = {
  add () {}
}

window.Setting = {
  addHeader () {},
  addToggle (name, options) {
    window.settings[name] = false
  },
  save () {}
}

window.settings = {}

window.passages = {}

window.State = {
  temporary: {},
  variables: {
    npcs: {},
    factions: [],
    buildings: []
  }
}

window.clone = clone
