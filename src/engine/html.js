import React from 'react'
import ReactDOM from 'react-dom'

/**
 * Converts a template literal into a react node array.
 *
 * @param {TemplateStringsArray} strings
 * @param  {...React.ReactNode} values
 * @return {React.ReactNodeArray}
 */
export function pragma (strings, ...values) {
  return strings.reduce((children, string, i) => {
    return [...children, string, getContent(values[i])]
  }, [])
}

/**
 * @typedef {React.ReactNode | (() => React.ReactNode)} Content
 */

/**
 * Displays an image.
 *
 * @param {string} url
 * @param {string} [alt]
 */
export const image = (url, alt) => () => (
  <img src={url} alt={alt} />
)

/**
 * @param {React.ReactNode} title
 * @param {() => void} callback
 */
export const button = (title, callback) => () => {
  const [content, updateContent] = useContentUpdate(callback)

  return (
    <React.Fragment>
      <button onClick={updateContent}>{title}</button>
      {content}
    </React.Fragment>
  )
}

/**
 * Presents a dropdown list of choices.
 *
 * @param {{[key: string]: any}} options
 * @param {(value: string) => void} onChange
 * @param {string} [selected] - The default selection
 */
export const listBox = (options, onChange, selected) => () => {
  const entries = Object.entries(options)
  const defaultValue = selected || entries[0][0]

  const handleChange = React.useCallback(event => {
    onChange(event.target.value)
  }, [])

  React.useEffect(() => onChange(defaultValue), [defaultValue])

  return (
    <select onChange={handleChange} defaultValue={selected}>
      {entries.map(([key, value], i) => {
        return <option key={i} value={key}>{value}</option>
      })}
    </select>
  )
}
/**
 * Creates a placeholder, which is meant to be replaced.
 *
 * @param {string} id
 * @param {Content} callback
 */
export const replaceable = (id, callback = null) => () => (
  <div id={id}>{getContent(callback)}</div>
)

/**
 * Creates a link, which leads to a new page that displays the provided content.
 * Or alteratively, executed the content as a callback and goes to a new page
 * to display the result.
 *
 * TODO: Implement linking.
 *
 * @param {React.ReactNode} title
 * @param {Content} callback
 */
export const link = (title, callback) => () => {
  // eslint-disable-next-line no-unused-vars
  const [content, updateContent] = useContentUpdate(callback)
  return <button onClick={updateContent}>{title}</button>
}

/**
 * Creates a link which appends the content once clicked.
 * Or alternatively, executes the content as a callback and appends the result.
 *
 * @param {React.ReactNode} title
 * @param {Content} callback
 */
export const linkAppend = (title, callback) => () => {
  const [content, updateContent] = useContentUpdate(callback)

  return (
    <React.Fragment>
      <button onClick={updateContent}>{title}</button>
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
 * @param {Content} callback
 */
export const replace = (selector, callback) => () => {
  const element = document.querySelector(selector)
  const content = getContent(callback)

  if (element) {
    return ReactDOM.createPortal(content, element)
  }

  throw Error(`No element matched the selector ${selector}.`)
}

/**
 * @param {React.ReactNode} title
 * @param {Content} callback
 */
export const linkReplace = (title, callback) => () => {
  const [content, updateContent] = useContentUpdate(callback)
  return content || <button onClick={updateContent}>{title}</button>
}

/**
 * Displays a note block.
 * @param {Content} callback
 */
export const note = callback => () => (
  <blockquote className="note">
    {getContent(callback)}
  </blockquote>
)

/**
 * Displays a tooltip.
 * @param {string} title
 * @param {Content} callback
 */
export const tip = (title, callback) => () => (
  <span className="tip" title={title}>
    {getContent(callback)}
  </span>
)

/**
 * Makes the first latter in a string into a fansy schmancy letter.
 * @param {string} content
 */
export const fancyFirstLetter = (content) => () => (
  <React.Fragment>
    <span className="firstcharacter">{content.substring(0, 1)}</span>
    {content.substring(1)}
  </React.Fragment>
)

// Utility Functions

/**
 * @param {Content} callback
 * @return {[Content, () => void]}
 */
function useContentUpdate (callback) {
  const [content, setContent] = React.useState(null)

  const updateContent = React.useCallback(() => {
    setContent(getContent(callback))
  }, [callback])

  return [content, updateContent]
}

/**
 * @param {Content} callback
 * @returns {React.ReactNode}
 */
function getContent (callback) {
  return typeof callback === `function` ? callback() : callback
}
