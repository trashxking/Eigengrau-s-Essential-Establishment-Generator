import { set, get, unset } from './story'

describe('story', () => {
  const createGet = name => () => {
    get(name)
  }

  it('sets story variables', () => {
    expect(set('$variable', 10)).toEqual(10)
  })

  it('gets story variables', () => {
    expect(get('$variable')).toEqual(10)
  })

  it('unsets story variables', () => {
    unset('$variable')
    expect(createGet('$variable')).toEqual(undefined)
  })

  it('sets deep story variables', () => {
    expect(set('$variable', {})).toEqual({})
    expect(set('$variable.value', 10)).toEqual(10)
  })

  it('gets and sets deep story variables', () => {
    expect(get('$variable.value')).toEqual(10)
  })

  it('unsets deep story variables', () => {
    unset('$variable.value')
    expect(createGet('$variable.value')).toEqual(undefined)
  })
})
