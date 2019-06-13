// @ts-check

/**
 * Holds the story state.
 * @type {Record<string, any>}
 */
const story = {}

/**
 * Gets a value from the story.
 * @param {string} name
 * @returns {any}
 */
export function get (name) {
  let object = story
  const paths = name.split(`.`)

  while (paths.length) {
    const path = paths.shift()

    if (path in object) {
      object = object[path]
    } else {
      return
    }
  }

  return object
}

/**
 * Stores a value in the story.
 * @template TValue
 * @param {string} name
 * @param {TValue} value
 */
export function set (name, value) {
  const paths = name.split(`.`)
  let object = story

  for (let i = 0; i < paths.length - 1; i++) {
    const path = paths[i]

    if (!(path in object)) {
      object[path] = {}
    }

    object = object[path]
  }

  const path = paths[paths.length - 1]
  object[path] = value

  return value
}

/**
 * Removes a value from the story.
 * Returns true if successful.
 * @param {string} name
 */
export function unset (name) {
  const paths = name.split(`.`)
  let object = story

  for (let i = 0; i < paths.length - 1; i++) {
    const path = paths[i]

    if (!(path in object)) {
      return false
    }

    object = object[path]
  }

  const path = paths[paths.length - 1]
  if (!(path in object)) {
    return false
  }

  delete object[path]
  return true
}
