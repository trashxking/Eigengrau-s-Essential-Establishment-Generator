/**
 * Clamps every value presented to the 1-100 range. Most useful for rolls.
 */
export function clampRolls (rolls) {
  for (const [roll, result] of Object.entries(rolls)) {
    if (result > 100) {
      console.log(`${result} was over 100.`)
      rolls[roll] = 100
    } else if (result < 1) {
      console.log(`${result} was under 1.`)
      rolls[roll] = 1
    }
  }
  return rolls
}
