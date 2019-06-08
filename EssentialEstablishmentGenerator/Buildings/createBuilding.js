import { random, randomRange, randomFloat, randomValue } from "../../src/engine/rolls"
import { clamp } from "../../src/engine/utils"
import { townData } from "../Town/js/townData"

/**
 * @param {object} town
 * @param {string} type
 * @param {any} base
 */
export function createBuilding (town, type, base) {
  let roadName = randomValue(townData.roads.name)
  let roadType = randomValue(townData.roads.type)

  // Tables used later
  if (random(100) < townData.type[town.type].roadDuplication && Object.keys(town.roads).length > 0) {
    // Roads are currently only supported with two words
    const randRoad = randomValue(Object.keys(town.roads))
    const roads = town.roads[randRoad].split(` `)
    roadName = roads[0] || roadName
    roadType = roads[1] || roadName
  }

  const lighting = randomValue([`poorly lit`, `somewhat dark`, `dimly lit`, `well lit`, `brightly lit`, `well lit`, `brightly lit`, `bright and welcoming`, `fire-lit`])
  const outside = randomValue([
    `a horse grazing on the bushes nearby`,
    `a rusted shovel near a somewhat overgrown flowerbed`,
    `a well with an old rope, but no bucket to go on the end`,
    `a dog panting by the door`,
    `a cat lazily lounging in the shade`,
    `a muddy pair of boots by the door`,
    `a sign from the local paper which reads '$newspaperheadline'`
  ])
  const material = [`wooden`, `wooden`, `wooden`, `wooden`, `wooden`, `stone`, `stone`, `stone`, `stone`, `hewn rock`, `chiseled stone`, `wooden`, `wooden`, `wooden`, `wooden`, `wooden`, `stone`, `stone`, `stone`, `stone`, `hewn rock`, `chiseled stone`, `marble`].seededrandom()
  const building = Object.assign({
    key: randomFloat(1).toString(16),
    roadName,
    roadType,
    get road () {
      return `${this.roadName} ${this.roadType}`
    },
    set road (road) {
      const roads = road.toString().split(` `)
      this.roadName = roads[0] || ``
      this.roadType = roads[1] || ``
    },
    associatedTown: town.name,
    type,
    lighting,
    outside,
    material,
    roll: {
      magic: (Math.floor(randomFloat(1) * 80) + 20),
      size: (Math.floor(randomFloat(1) * 80) + 20),
      diversity: (Math.floor(randomFloat(1) * 80) + 20),
      wealth: randomRange(1, 100),
      population: randomRange(1, 100),
      reputation: randomRange(1, 100),
      sin: randomRange(1, 100),
      roughness: randomRange(1, 100),
      cleanliness: randomRange(1, 100),
      expertise: randomRange(1, 100),
      activity: randomRange(1, 100)
    },
    // magicRoll: (Math.floor(randomFloat(1) * 80) + 20),
    priceModifier: Math.floor(randomFloat(1) * 10) - randomValue([0, 10])
    // diversityRoll: (Math.floor(randomFloat(1) * 80) + 20),
    // wealthRoll: random(1, 100),
    // roughnessRoll: random(1, 100),
  }, base)

  town.roads[building.key] = building.road

  building.roll.wealth = clamp(building.roll.wealth, 1, 100)
  building.priceModifier = clamp(building.priceModifier, -10, 10)
  building.roll.reputation = clamp(building.roll.reputation, 1, 100)
  building.roll.sin = clamp(building.roll.sin, 1, 100)
  building.roll.diversity = clamp(building.roll.diversity, 1, 100)
  building.roll.magic = clamp(building.roll.magic, 1, 100)
  building.roll.size = clamp(building.roll.size, 1, 100)
  building.roll.population = clamp(building.roll.population, 1, 100)
  building.roll.roughness = clamp(building.roll.roughness, 1, 100)
  building.roll.cleanliness = clamp(building.roll.cleanliness, 1, 100)
  building.roll.expertise = clamp(building.roll.expertise, 1, 100)
  building.roll.activity = clamp(building.roll.activity, 1, 100)

  // if (building.roll.size > 80) {
  //   building.size = 'huge'
  //   // building.floorPlan = dice(3, 6)
  // } else if (building.roll.size > 70) {
  //   building.size = 'quite large'
  //   // building.floorPlan = dice(3, 3)
  // } else if (building.roll.size > 60) {
  //   building.size = 'large'
  //   // building.floorPlan = dice(2, 3)
  // } else if (building.roll.size > 50) {
  //   building.size = 'spacious'
  //   // building.floorPlan = dice(2, 2)
  // } else if (building.roll.size > 40) {
  //   building.size = 'medium'
  //   // building.floorPlan = dice(1, 3)
  // } else if (building.roll.size > 30) {
  //   building.size = 'slightly cramped'
  //   // building.floorPlan = dice(1, 2)
  // } else if (building.roll.size > 20) {
  //   building.size = 'small'
  //   // building.floorPlan = dice(1, 2)
  // } else if (building.roll.size <= 20) {
  //   building.size = 'tiny'
  //   // building.floorPlan = 1
  // }

  // building.rooms = setup.createRooms(building)

  // if (building.roll.wealth > 95) {
  //   building.wealth = 'kingly'
  // } else if (building.roll.wealth > 80) {
  //   building.wealth = 'aristocratic'
  // } else if (building.roll.wealth > 70) {
  //   building.wealth = 'wealthy'
  // } else if (building.roll.wealth > 60) {
  //   building.wealth = 'comfortable'
  // } else if (building.roll.wealth > 50) {
  //   building.wealth = 'modest'
  // } else if (building.roll.wealth > 25) {
  //   building.wealth = 'poor'
  // } else if (building.roll.wealth <= 25) {
  //   building.wealth = 'squalid'
  // }

  // if (building.roll.cleanliness > 80) {
  //   building.cleanliness = 'absolutely spotless'
  //   building.bedCleanliness = 'perfectly prepared, with fresh sheets and a lemon scent in the air of the room'
  // } else if (building.roll.cleanliness > 70) {
  //   building.cleanliness = 'spotless'
  //   building.bedCleanliness = 'freshly cleaned and neat'
  // } else if (building.roll.cleanliness > 60) {
  //   building.cleanliness = 'hygienic'
  //   building.bedCleanliness = 'tidy and neat'
  // } else if (building.roll.cleanliness > 50) {
  //   building.cleanliness = 'decently hygienic'
  //   building.bedCleanliness = 'reasonably clean'
  // } else if (building.roll.cleanliness > 40) {
  //   building.cleanliness = 'slightly grubby'
  //   building.bedCleanliness = 'somewhat tidy'
  // } else if (building.roll.cleanliness > 30) {
  //   building.cleanliness = 'quite dirty'
  //   building.bedCleanliness = 'disgusting'
  // } else if (building.roll.cleanliness > 20) {
  //   building.cleanliness = 'rather filthy'
  //   building.bedCleanliness = 'teeming with rats'
  // } else if (building.roll.cleanliness <= 20) {
  //   building.cleanliness = 'absolutely putrid'
  //   building.bedCleanliness = 'festering with bugs'
  // }
  //
  // if (building.roll.sin > 80) {
  //   building.sin = 'corrupt'
  // } else if (building.roll.sin > 70) {
  //   building.sin = 'venal'
  // } else if (building.roll.sin > 60) {
  //   building.sin = 'sleazy'
  // } else if (building.roll.sin > 50) {
  //   building.sin = 'seedy'
  // } else if (building.roll.sin > 40 && building.roll.roughness > 60) {
  //   building.sin = 'surprisingly trustworthy'
  // } else if (building.roll.sin > 40) {
  //   building.sin = 'trustworthy'
  // } else if (building.roll.sin > 30 && building.roll.roughness > 60) {
  //   building.sin = 'surprisingly reliable'
  // } else if (building.roll.sin > 30) {
  //   building.sin = 'reliable'
  // } else if (building.roll.sin > 20 && building.roll.roughness > 60) {
  //   building.sin = 'surprisingly honest'
  // } else if (building.roll.sin > 20) {
  //   building.sin = 'honest'
  // } else if (building.roll.sin <= 20) {
  //   building.sin = 'saintly'
  // }
  //
  // if (building.roll.roughness > 80) {
  //   building.roughness = 'bloodthirsty'
  // } else if (building.roll.roughness > 70) {
  //   building.roughness = 'quite rough'
  // } else if (building.roll.roughness > 60) {
  //   building.roughness = 'rough'
  // } else if (building.roll.roughness > 50) {
  //   building.roughness = 'alright'
  // } else if (building.roll.roughness > 40) {
  //   building.roughness = 'placid'
  // } else if (building.roll.roughness > 30) {
  //   building.roughness = 'calm'
  // } else if (building.roll.roughness > 20) {
  //   building.roughness = 'tranquil'
  // } else if (building.roll.roughness <= 20) {
  //   building.roughness = 'serene'
  // }
  //
  // if (building.roll.expertise > 80) {
  //   building.expertise = 'masterful'
  // } else if (building.roll.expertise > 70) {
  //   building.expertise = 'exceptional'
  // } else if (building.roll.expertise > 60) {
  //   building.expertise = 'superior quality'
  // } else if (building.roll.expertise > 50) {
  //   building.expertise = 'finely-crafted'
  // } else if (building.roll.expertise > 40) {
  //   building.expertise = 'well-crafted'
  // } else if (building.roll.expertise > 30) {
  //   building.expertise = 'somewhat well made'
  // } else if (building.roll.expertise > 20) {
  //   building.expertise = 'somewhat amateur'
  // } else if (building.roll.expertise <= 20) {
  //   building.expertise = 'blatantly amateur'
  // }
  //
  // if (building.roll.activity > 80) {
  //   building.activity = 'extremely busy'
  // } else if (building.roll.activity > 70) {
  //   building.activity = 'very busy'
  // } else if (building.roll.activity > 60) {
  //   building.activity = 'rather busy'
  // } else if (building.roll.activity > 50) {
  //   building.activity = 'reasonably busy'
  // } else if (building.roll.activity > 40) {
  //   building.activity = 'not terribly busy'
  // } else if (building.roll.activity > 30) {
  //   building.activity = 'not busy'
  // } else if (building.roll.activity > 20) {
  //   building.activity = 'rather quiet'
  // } else if (building.roll.activity <= 20) {
  //   building.activity = 'very quiet'
  // }
  // console.log(building)
  if (type) {
    if (!town.buildings[type]) {
      town.buildings[type] = {}
    }
    town.buildings[type][building.key] = building
  }
  if (!building.isThrowaway) {
    State.variables.buildings.push(building)
    // setup.townBinder(town, building, type)
  }

  // building.id = State.variables.buildings[State.variables.buildings.length - 1]
  // console.log(building)
  return building
}
