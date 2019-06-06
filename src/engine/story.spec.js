import { set, get } from './story'

describe('story', () => {
  it('gets and sets story variables', () => {
    set('$variable', 10)
    expect(get('$variable')).toEqual(10)
  })

  it('gets and sets deep story variables', () => {
    set('$variable', {})
    set('$variable.value', 10)
    expect(get('$variable.value')).toEqual(10)
  })
})
