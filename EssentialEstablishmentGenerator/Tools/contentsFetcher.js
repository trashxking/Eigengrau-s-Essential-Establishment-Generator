/**
 * This is the function used to handle random encounters. It needs a lot of work, and will change.
 */
export function contentsFetcher (town, biome, keyTarget, contentsTarget, base) {
  const key = keyTarget.random()
  const contents = contentsTarget[key]
  return contents(town, biome, base)
}
