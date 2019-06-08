import { randomRange } from "../../src/engine/rolls"

/**
 * @param {{ [x: string]: number; }} object
 * @param {string | string[] | Record<string, any>} propNames
 */
setup.createRolls = function (object, propNames) {
  console.groupCollapsed(`Creating rolls...`)
  console.log({ object })

  if (typeof propNames === `string` && !object[propNames]) {
    object[propNames] = randomRange(1, 100)
  } else if (Array.isArray(propNames)) {
    for (const propName of propNames) {
      if (!Object.keys(object).includes(propName)) {
        console.log(`No ${propName} roll value! Creating one...`)
        console.log({ object })
        object[propName] = randomRange(1, 100)
      }
    }
  } else if (typeof propNames === `object`) {
    for (const propName of Object.keys(propNames)) {
      if (!Object.keys(object).includes(propName)) {
        console.log(`No ${propName} roll value! Creating one...`)
        console.log({ object })
        object[propName] = randomRange(1, 100)
      }
    }
  } else {
    console.error(`Expected a string, object, or array!`)
    console.log({ object })
    console.log({ propNames })
  }

  console.groupEnd()
}
