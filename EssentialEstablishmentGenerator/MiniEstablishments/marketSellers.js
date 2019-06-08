import { createNPC } from "../NPCGeneration/SetupNPC"
import { marketData } from "./marketData"

export function createMarketSellers (town, obj, opts = {}, number) {
  let i
  for (i = 0; i < number; i++) {
    const npc = createNPC(town, Object.assign({
      profession: `merchant`,
      merchant: {
        selling: [
          `selling ${marketData.vendors.selling.seededrandom()}`,
          `${[
            `shouting out `,
            `calling `,
            `calling to any who would listen: `,
            `hawking goods, saying `,
            `shouting `,
            `beckoning `,
            `saying loudly `
          ].seededrandom()}"${
            marketData.vendors.shouts.seededrandom()} ${marketData.vendors.suffix.seededrandom()}"`
        ].seededrandom(),
        tent: marketData.vendors.tent.seededrandom()
      },
      hasClass: false,
      isThrowaway: true,
      isShallow: true,
      canBeCustom: true
    }, opts))
    obj[npc.key] = npc.merchant
  }
  return obj
}
