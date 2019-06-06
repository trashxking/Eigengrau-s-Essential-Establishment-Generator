import { set, get, unset } from './story'

describe('story', () => {
  it('sets story variables', () => {
    expect(set('$variable', 10)).toEqual(10)
  })

  it('gets story variables', () => {
    expect(get('$variable')).toEqual(10)
  })

  it('unsets story variables', () => {
    unset('$variable')
    expect(get('$variable')).toEqual(undefined)
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
    expect(get('$variable.value')).toEqual(undefined)
  })
})
