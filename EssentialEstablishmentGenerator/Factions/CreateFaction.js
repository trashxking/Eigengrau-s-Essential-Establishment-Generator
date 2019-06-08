import { factionData } from "./factionData"
import { nameFaction } from "./names"
import { ageFaction } from "./age"
import { reputationFaction } from "./reputation"
import { sizeFaction } from "./size"
import { influenceFaction } from "./influence"
import { resourcesFaction } from "./resources"
import { stabilityFaction } from "./stability"
import { leaderFaction } from "./leader"
import { joinFaction } from "./joining"
import { createAllies } from "./allies"
import { createRivals } from "./rivals"
import { createMisc } from "./misc"

export function createFaction (town, opts = {}) {
  const type = [`thieves`, `merchants`, `wizards`, `rangers`, `seers`, `priests`, `monks`, `assassins`, `artisans`, `nobles`, `bards`, `mercenaries`, `bandits`, `craftsmen`, `scholars`].seededrandom()
  // s are defined immediately in case they're needed in the subroutines out of order (i.e. it makes no sense to initialise Size in the size.js function if it's being used in "reputation.js")

  const faction = (opts[`newFaction`] || Object.assign({
    id: [State.variables.factions.length - 1],
    key: randomFloat(1).toString(16),
    passageName: `FactionProfile`,
    associatedTown: town.name,
    type,
    wordNoun: factionData.type[type].wordNoun,
    motivation: factionData.type[type].motivation.seededrandom(),
    membersTrait: factionData.type[type].membersTrait.seededrandom(),
    leadershipType: [`individual`, `individual`, `individual`, `group`, `group`].seededrandom(),
    roll: {
      influence: dice(2, 50),
      reputation: dice(2, 50),
      age: dice(2, 50),
      size: dice(2, 50),
      stability: dice(2, 50),
      resources: dice(2, 50)
    }
  }, opts))
  faction.name = nameFaction(town.name, faction.type)
  console.groupCollapsed(`${faction.name} the ${faction.type} have loaded.`)

  ageFaction(faction)

  reputationFaction(faction)

  sizeFaction(town, faction)

  influenceFaction(faction)

  resourcesFaction(faction)

  stabilityFaction(faction)

  leaderFaction(town, faction)

  joinFaction(faction)

  createAllies(faction)

  createRivals(faction)
  console.log(`other cool bits...`)
  createMisc(faction)

  faction.tippyDescription = `A ${faction.size} ${faction.type} ${faction.wordNoun} called ${faction.name}`

  console.groupEnd()
  return faction
}
