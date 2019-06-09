import { set, get } from '../../src/engine/story'

export function Alchemist () {
  set(`$alchemist`, setup.createAlchemist(get(`$town`)))
}
