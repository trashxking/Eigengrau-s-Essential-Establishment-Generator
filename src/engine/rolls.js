import Randoma from 'randoma'

/**
 * All functions use this pseudo-random number generation library.
 * @see https://www.npmjs.com/package/randoma
 */
const seeded = new Randoma({ seed: 0 })

/**
 * Returns a random number between zero and the defined maximum value.
 * @param {number} max
 */
export function random (max) {
  return seeded.integerInRange(0, max)
}

/**
 * Returns a random floating point number between zero and the defined maximum value.
 * @param {number} max
 */
export function randomFloat (max) {
  return seeded.floatInRange(0, max)
}

/**
 * Returns a random number between the defined minimum and maximum value.
 * @param {number} min
 * @param {number} max
 */
export function randomRange (min, max) {
  return seeded.integerInRange(min, max)
}

/**
 * Returns a random floating point number between zero and the defined maximum value.
 * @param {number} min
 * @param {number} max
 */
export function randomFloatRange (min, max) {
  return seeded.floatInRange(min, max)
}

/**
 * Returns a random value from an array.
 * @template T
 * @param {T[]} array
 */
export function randomValue (array) {
  return seeded.arrayItem(array)
}

/**
 * Returns a random choice from the provided values.
 * @template T
 * @param {T[]} values
 */
export function either (...values) {
  return seeded.arrayItem(values)
}
