import { randomValue, randomRange } from "../../../src/engine/rolls"

/**
 * @param {object} town
 * @param {object} smithy
 */
export function createSmithyName (town, smithy) {
  const { blacksmith } = smithy

  const smithyNameRoll = randomRange(1, 5)
  const adjective = randomValue([`Hard`, `Sharp`, `Pointy`, `Well-worn`, `Rusted`, `Shiny`, `Cold`, `Glowing`, `Heated`, `Golden`, `Silvered`, `Bronzed`, `Polished`, `Engraved`, `Jeweled`, `Plated`, `Eternal`, `Long-Lasting`, `Famed`])
  const noun = randomValue([`Iron`, `Metal`, `Gold`, `Silver`, `Bronze`, `Copper`, `Platinum`, `Electrum`, `Ingot`, `Tongs`, `Pliers`, `Anvil`, `Hammer`, `Forge`, `Bellows`, `Bucket`, `Steam`, `Smoke`, `Chimney`, `Flame`, `Fire`, `Magma`, `Coal`, `Crucible`])
  const family = randomValue([`son`, `daughter`, `brother`, `sister`, `uncle`, `aunt`, `father`, `friend`, `family`, `employee`])
  const rider = randomValue([`Shop`, `Blacksmith`, `Fabricator`, `Smith`, `Smithy`, `Farrier`, `Metalsmith`, `Swordsmith`])
  const profession = [`blacksmith`, `blacksmith's assistant`, `blacksmith's assistant`, `blacksmith's assistant`]

  const fam = {
    son: {
      relationships: {
        [blacksmith.key]: blacksmith.parentNoun
      },
      gender: `man`,
      race: blacksmith.race,
      lastName: blacksmith.lastName,
      ageStage: `young adult`,
      profession: randomValue(profession)
    },
    daughter: {
      relationships: {
        [blacksmith.key]: blacksmith.parentNoun
      },
      gender: `woman`,
      race: blacksmith.race,
      lastName: blacksmith.lastName,
      ageStage: `young adult`,
      profession: randomValue(profession)
    },
    brother: {
      relationships: {
        [blacksmith.key]: blacksmith.siblingNoun
      },
      gender: `man`,
      race: blacksmith.race,
      lastName: blacksmith.lastName,
      ageStage: blacksmith.ageStage,
      profession: randomValue(profession)
    },
    sister: {
      relationships: {
        [blacksmith.key]: blacksmith.siblingNoun
      },
      gender: `woman`,
      race: blacksmith.race,
      lastName: blacksmith.lastName,
      ageStage: blacksmith.ageStage,
      profession: randomValue(profession)
    },
    uncle: {
      relationships: {
        [blacksmith.key]: blacksmith.niblingNoun
      },
      gender: `man`,
      race: blacksmith.race,
      lastName: blacksmith.lastName,
      ageStage: `settled adult`,
      profession: randomValue(profession)
    },
    aunt: {
      relationships: {
        [blacksmith.key]: blacksmith.niblingNoun
      },
      gender: `woman`,
      race: blacksmith.race,
      lastName: blacksmith.lastName,
      ageStage: `settled adult`,
      profession: randomValue(profession)
    },
    father: {
      relationships: {
        [blacksmith.key]: blacksmith.childNoun
      },
      gender: `man`,
      race: blacksmith.race,
      lastName: blacksmith.lastName,
      ageStage: `settled adult`,
      profession: randomValue(profession)
    },
    friend: {
      relationships: {
        [blacksmith.key]: `friend`
      },
      ageStage: `settled adult`,
      profession: randomValue(profession)
    },
    family: {
      relationships: {
        [blacksmith.key]: `relative`
      },
      lastName: blacksmith.lastName,
      race: blacksmith.race,
      ageStage: `settled adult`,
      profession: randomValue(profession)
    },
    employee: {
      relationships: {
        [blacksmith.key]: `employer`
      },
      gender: `man`,
      profession: randomValue(profession)
    }
  }

  switch (smithyNameRoll) {
    case 1:
      smithy.name = `The ${adjective} ${noun}`
      break
    case 2:
      smithy.name = `${blacksmith.firstName} and ${family.toUpperFirst()}`
      smithy.assistant = setup.createNPC(town, fam[family])
      setup.createRelationship(town, blacksmith, smithy.assistant, family, smithy.assistant.relationships[blacksmith.key])
      break
    case 3:
      smithy.name = `The ${noun} and ${family.toUpperFirst()}`
      smithy.assistant = setup.createNPC(town, fam[family])
      setup.createRelationship(town, blacksmith, smithy.assistant, family, smithy.assistant.relationships[blacksmith.key])
      break
    case 4:
      smithy.name = `The ${adjective} ${rider}`
      break
    case 5:
      smithy.name = `${adjective} ${noun}`
      break
    default:
      smithy.name = `The ${adjective} Smithy`
  }
  return smithy
}
