import { randomRange } from '../../src/engine/rolls'
import { PatreonSupporters } from '../Meta/PatreonSupporters'
import { EmailSignUp } from '../Meta/EmailSignUp'

export function Popup () {
  const _roll = randomRange(1, 99)

  if (_roll > 80) {
    return `<blockquote>Find us on Reddit at [[/r/EigengrausGenerator|https://www.reddit.com/r/EigengrausGenerator]]! </blockquote>`
  }

  if (_roll > 55) {
    return `<blockquote>${PatreonSupporters()}</blockquote>`
  }

  if (_roll > 40) {
    return `<blockquote>${EmailSignUp()}</blockquote>`
  }

  if (_roll < 40) {
    return `<blockquote>If you have any bug reports, please click here: [[Submit a bug report|https://github.com/ryceg/Eigengrau-s-Essential-Establishment-Generator/issues/]]</blockquote>`
  }
}
