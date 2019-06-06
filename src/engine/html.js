import React from 'react'
import ReactDOM from 'react-dom'

/**
 * Converts a template literal into a react node array.
 *
 * @param {TemplateStringsArray} strings
 * @param  {...React.ReactNode} values
 * @return {React.ReactNodeArray}
 */
export const pragma = (strings, ...values) => {
  return strings.reduce((children, string, i) => {
    const value = values[i]
    const child = typeof value === 'function' ? value() : value
    return [...children, string, child]
  }, [])
}

/**
 * Displays an image.
 *
 * @param {string} url
 * @param {string} [alt]
 */
export const image = (url, alt) => () => {
  return <img src={url} alt={alt} />
}

/**
 * @param {React.ReactNode} title
 * @param {() => void} callback
 */
export const button = (title, callback) => () => {
  return <button onClick={callback}>{title}</button>
}

/**
 * Presents a dropdown list of choices.
 *
 * @param {{[key: string]: any}} options
 * @param {(value: string) => void} onChange
 */
export const listBox = (options, onChange) => () => {
  const entries = Object.entries(options)

  const handleChange = React.useCallback(event => {
    onChange(event.target.value)
  }, [])

  return (
    <select onChange={handleChange}>
      {entries.map(([key, value], i) => {
        return <option key={i} value={key}>{value}</option>
      })}
    </select>
  )
}

/**
 * Creates a link, which leads to a new page that displays the provided content.
 * Or alteratively, executed the content as a callback and goes to a new page
 * to display the result.
 *
 * TODO: Implement linking.
 *
 * @param {React.ReactNode} title
 * @param {React.ReactNode | (() => React.ReactNode)} callback
 */
export const link = (title, callback) => () => {
  // eslint-disable-next-line no-unused-vars
  const [content, setContent] = React.useState(null)

  const handleClick = React.useCallback(() => {
    setContent(typeof callback === 'function' ? callback() : callback)
  }, [])

  return <button onClick={handleClick}>{title}</button>
}

/**
 * Creates a link which appends the content once clicked.
 * Or alternatively, executes the content as a callback and appends the result.
 *
 * @param {React.ReactNode} title
 * @param {React.ReactNode | (() => React.ReactNode)} callback
 */
export const linkAppend = (title, callback) => () => {
  const [content, setContent] = React.useState(null)

  const handleClick = React.useCallback(() => {
    setContent(typeof callback === 'function' ? callback() : callback)
  }, [])

  return (
    <React.Fragment>
      <button onClick={handleClick}>{title}</button>
      {content}
    </React.Fragment>
  )
}

/**
 * Replaces the contents of the selected element(s)
 * with the provided content.
 *
 * Or alternatively, the result of the content callback.
 *
 * @param {string} selector
 * @param {React.ReactNode | (() => React.ReactNode)} callback
 */
export const replace = (selector, callback) => () => {
  const element = document.querySelector(selector)
  const content = typeof callback === 'function' ? callback() : callback

  if (element) {
    return ReactDOM.createPortal(content, element)
  }

  throw Error(`No element matched the selector ${selector}.`)
}

/**
 * @param {React.ReactNode} title
 * @param {React.ReactNode | (() => React.ReactNode)} callback
 */
export const linkReplace = (title, callback) => () => {
  const [content, setContent] = React.useState(null)

  const handleClick = React.useCallback(() => {
    setContent(typeof callback === 'function' ? callback() : callback)
  }, [])

  return content || <button onClick={handleClick}>{title}</button>
}

/**
 * Displays a tooltip.
 * @param {string} title
 * @param {React.ReactNode | (() => React.ReactNode)} callback
 */
export const tip = (title, callback) => () => {
  const content = typeof callback === 'function' ? callback() : callback
  return <span className="tip" title={title}>{content}</span>
}

/**
 * Makes the first latter in a string into a fansy schmancy letter.
 * @param {string} content
 */
export const fancyFirstLetter = (content) => () => {
  return (
    <React.Fragment>
      <span className="firstcharacter">{content.substring(0, 1)}</span>
      {content.substring(1)}
    </React.Fragment>
  )
}
