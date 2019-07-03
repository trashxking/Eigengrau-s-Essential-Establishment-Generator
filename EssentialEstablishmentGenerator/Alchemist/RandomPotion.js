import { link, pragma } from '../../src/engine/html'
import { set } from '../../src/engine/story'

export function RandomPotion () {
  return `${link(`<h6>Generate a random potion!</h6>`, () => {
    const $randomPotion = set(`$randomPostion`, setup.createAlchemy({ type: `potion` }))

    return pragma`
<div class='descriptive'><h3>${$randomPotion.titleReadout}</h3>${$randomPotion.descriptionReadout}</div>
<blockquote>${$randomPotion.effectReadout}</blockquote>
<<replace "#randpotion">>
<div class='descriptive'><h3>${$randomPotion.titleReadout}</h3>${$randomPotion.descriptionReadout}
<blockquote>${$randomPotion.effectReadout}</blockquote></div>
<</replace>>`
  })}
<span id="randpotion"></span>`
}
