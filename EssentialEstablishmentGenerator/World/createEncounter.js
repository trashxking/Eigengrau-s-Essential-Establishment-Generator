import { misc } from "./miscData"

export function createEncounter (town, biome) {
  return misc[biome].create(town)
}
