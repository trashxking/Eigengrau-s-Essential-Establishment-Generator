import { randomValue } from "../../../src/engine/rolls"

/**
 * @param {string} chemistFirstName
 * @returns {string}
 */
export function createAlchemistName (chemistFirstName) {
  const adjective = randomValue([`Bubbling`, `Spicy`, `Soggy`, `Fizzy`, `Liquid`, `Fluorescent`, `Clear`, `Alcoholic`, `Abyssal`, `Angelic`, `Elven`, `Measured`, `Marked`, `Glass`, `Glass`, `Copper`, `Corked`, `Burning`, `Red`, `Blue`, `Green`, `Gold`, `Yellow`, `Vile`, `Genuine`, `Original`])
  const noun = randomValue([`Potion`, `Liquid`, `Fumes`, `Bottle`, `Vial`, `Firewater`, `Mortar and Pestle`, `Lab`, `Laboratory`, `Chemist`, `Alchemist`, `Brewer`, `Lotion`, `Wishes`])
  const adjective2 = randomValue([`Bubbling`, `Spicy`, `Soggy`, `Fizzy`, `Liquid`, `Fluorescent`, `Clear`, `Alcoholic`, `Abyssal`, `Angelic`, `Elven`, `Measured`, `Marked`, `Glass`, `Glass`, `Copper`, `Corked`, `Burning`, `Red`, `Blue`, `Green`, `Gold`, `Yellow`, `Vile`, `Genuine`, `Original`])
  const rider = randomValue([`Chemist`, `Alchemist`, `Potion Shop`, `Potionery`, `Ointmentary`, `Juice Bar`, `Lab`, `Laboratory`, `Secret Lair`])

  switch (dice(1, 5)) {
    case 1:
      return `The ${adjective} ${noun}`
    case 2:
      return `${chemistFirstName} and ${adjective2}`
    case 3:
      return `The ${noun} and ${adjective2}`
    case 4:
      return `The ${adjective} ${rider}`
    case 5:
      return `${adjective} ${noun}`
    default:
      return `The ${adjective} Alchemist`
  }
}
