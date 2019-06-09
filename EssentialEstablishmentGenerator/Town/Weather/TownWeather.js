import { get, set } from '../../../src/engine/story'

export function TownWeather () {
  const $town = get(`$town`)

  /**
   * Setting precipitation intensity based on height.
   */

  if ([`seacoast`, `volcanic field`, `ice sheet`].includes($town.location)) {
    set(`$weather.precipitationIntensity`, 3)
  } else {
    set(`$weather.precipitationIntensity`, 2)
  }

  const $weather = get(`$weather`)

  const { precipitationLevel, precipitationIntensity, temperature } = $weather

  switch ($town.terrain) {
    case `temperate`:
      set(`$weather.precipitationLevel`, precipitationLevel + 1)
      set(`$weather.precipitationIntensity`, precipitationIntensity + 1)
      break
    case `tropical`:
      set(`$weather.precipitationLevel`, precipitationLevel - 1)
      set(`$weather.precipitationIntensity`, precipitationIntensity + 1)
      break
    case `polar`:
      set(`$weather.precipitationLevel`, precipitationLevel + 1)
      break
    case `arid`:
      set(`$weather.precipitationLevel`, precipitationLevel - 1)
      set(`$weather.precipitationIntensity`, precipitationIntensity - 1)
      break
  }

  /**
   * Testing which season it is, and assigning temperature
   * and precipitation frequency based off that.
   */

  switch ($weather.season) {
    case `summer`:
      switch ($town.terrain) {
        case `temperate`:
          set(`$weather.precipitationLevel`, 4)
          set(`$weather.temperature`, 80)
          break
        case `tropical`:
          set(`$weather.precipitationLevel`, 3)
          set(`$weather.temperature`, 90)
          break
        case `polar`:
          set(`$weather.precipitationLevel`, 4)
          set(`$weather.temperature`, 40)
          break
        case `arid`:
          set(`$weather.precipitationLevel`, 3)
          set(`$weather.temperature`, 95)
          break
      }
      break
    case `autumn`:
      switch ($town.terrain) {
        case `temperate`:
          set(`$weather.precipitationLevel`, 3)
          set(`$weather.temperature`, 60)
          break
        case `tropical`:
          set(`$weather.precipitationLevel`, 3)
          set(`$weather.temperature`, 75)
          break
        case `polar`:
          set(`$weather.precipitationLevel`, 4)
          set(`$weather.temperature`, 30)
          break
        case `arid`:
          set(`$weather.precipitationLevel`, 3)
          set(`$weather.temperature`, 75)
          break
      }
      break
    case `winter`:
      switch ($town.terrain) {
        case `temperate`:
          set(`$weather.precipitationLevel`, 2)
          set(`$weather.temperature`, 30)
          break
        case `tropical`:
          set(`$weather.precipitationLevel`, 2)
          set(`$weather.temperature`, 50)
          break
        case `polar`:
          set(`$weather.precipitationLevel`, 2)
          set(`$weather.temperature`, 20)
          break
        case `arid`:
          set(`$weather.precipitationLevel`, 2)
          set(`$weather.temperature`, 50)
          break
      }
      break
    case `spring`:
      switch ($town.terrain) {
        case `temperate`:
          set(`$weather.precipitationLevel`, 3)
          set(`$weather.temperature`, 60)
          break
        case `tropical`:
          set(`$weather.precipitationLevel`, 4)
          set(`$weather.temperature`, 75)
          break
        case `polar`:
          set(`$weather.precipitationLevel`, 3)
          set(`$weather.temperature`, 30)
          break
        case `arid`:
          set(`$weather.precipitationLevel`, 2)
          set(`$weather.temperature`, 75)
          break
      }
      break
  }

  /**
   * More stuff based on location, this time changing the precipitation frequency
   * and temperature, now that they're defined.
   */

  if ([`seacoast`, `volcanic field`, `ice sheet`].includes($town.location)) {
    set(`$weather.temperature`, temperature + random(8, 12))
  }

  if ([`hills`, `mountains`].includes($town.location)) {
    set(`$weather.temperature`, temperature - random(8, 12))
    set(`$weather.precipitationLevel`, precipitationLevel - 1)
  }

  set(`$weather.temperatureTimer`, 0)
  set(`$weather.precipitationTimer`, 0)
  set(`$weather.cloudTimer`, 0)
}
