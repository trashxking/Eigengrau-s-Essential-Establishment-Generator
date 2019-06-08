export function createEncounter (town, biome) {
  return setup.misc[biome].create(town)
}
