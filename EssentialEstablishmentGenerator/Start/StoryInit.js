import { set } from '../../src/engine/story'
import { randomValue } from '../../src/engine/rolls'
import { Town } from '../Town/Town'
import { TownWeather } from '../Town/Weather/TownWeather'
import { Books } from '../Misc/Books'
import { PatreonCharacters } from '../Misc/PatreonCharacters'
import { PlotHook } from '../PlotHook/PlotHook'
import { ShitPlotHooks } from '../ShitPlotHooks'
import { Newspaper } from '../Misc/Newspaper'

export function StoryInit () {
  set('$versionNumber', '2.2.1')

  set('$towns', [])
  set('$factions', [])
  set('$buildings', [])
  set('$npcs', {})
  set('$throwawayNpcs', {})

  Town()

  set('$weather', {
    season: randomValue(['winter', 'spring', 'summer', 'autumn']),
    seasonPool: ['winter', 'spring', 'summer', 'autumn']
  })

  /** FIXME */
  TownWeather()

  Books()

  PatreonCharacters()

  PlotHook()

  ShitPlotHooks()

  Newspaper()

  /* <<if settings.showTutorial is false>>
    <<set Config.passages.start = 'Start'>>
  <<else>>
    <<set Config.passages.start = 'Welcome'>>
  <</if>>

  <<if ndef $hideAds>>
    <<set $hideAds to true>>
    <<set settings.hideAds to true>>
  <</if>> */
}
