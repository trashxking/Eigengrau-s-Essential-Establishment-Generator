import { townData } from "./townData"

export function updateSocioPolitics (town) {
  const politicalIdeologyIC = town.politicalIdeologyIC
  const economicIdeologyIST = town.economicIdeologyIST

  const economicPairs = {
    feudalist: `feudalism`,
    capitalist: `capitalism`,
    syndicalist: `syndicalism`,
    primitivist: `primitivism`,
    communist: `communism`
  }

  const politicalIdeologyPairs = {
    autocratic: `autocracy`,
    meritocratic: `meritocracy`,
    democratic: `democracy`,
    kleptocratic: `kleptocracy`,
    magocratic: `magocracy`,
    militocratic: `militocracy`,
    oligarchic: `oligarchy`,
    pedocratic: `pedocracy`,
    theocratic: `theocracy`,
    technocratic: `technocracy`
  }

  if (economicIdeologyIST !== townData.economicIdeology[town.economicIdeology].descriptors.economicIdeologyIST) {
    town.economicIdeology = economicPairs[economicIdeologyIST]
  }

  if (politicalIdeologyIC !== townData.politicalIdeology[town.politicalIdeology].data.politicalIdeologyIC) {
    town.politicalIdeology = politicalIdeologyPairs[politicalIdeologyIC]
  }

  town = Object.assign(town, townData.economicIdeology[town.economicIdeology].descriptors)
  town = Object.assign(town, townData.politicalIdeology[town.politicalIdeology].data)

  return town
}
