/**
 * Stores the story state.
 * @type {Object.<string, any>}
 */
const story = {}

/**
 * Gets a value from the story.
 * @param {string} name
 */
export function get (name) {
  let object = story
  const paths = name.split('.')

  while (paths.length) {
    const path = paths.shift()

    if (path in object) {
      object = object[path]
    } else {
      throw new ReferenceError(`The variable ${name} does not exist.`)
    }
  }

  return object
}

/**
 * Stores a value in the story.
 * @param {string} name
 * @param {any} value
 */
export function set (name, value) {
  const paths = name.split('.')
  let object = story

  for (let i = 0; i < paths.length - 1; i++) {
    const path = paths[i]

    if (!(path in object)) {
      object[path] = {}
    }

    object = object[path]
  }

  object[paths[paths.length - 1]] = value

  return value
}

/**
 * Removes a value from the story.
 * @param {string} name
 */
export function unset (name) {
  if (name in story) {
    delete story[name]
  }
  throw new ReferenceError(`The variable ${name} does not exist.`)
}
