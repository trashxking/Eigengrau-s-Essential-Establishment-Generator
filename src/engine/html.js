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
  return strings.reduce((children, string, i) => [...children, string, values[i]], [])
}

/**
 * Creates a link which silently executes its contents when clicked,
 * optionally forwarding the player to another passage.
 *
 * @param {React.ReactNode} title
 * @param {() => React.ReactNode} callback
 */
export const link = (title, callback) => () => {
  const [content, setContent] = React.useState(null)
  const handleClick = () => setContent(callback())

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
 * @param {React.ReactNode | (() => React.ReactNode)} content
 */
export const replace = (selector, content) => () => {
  const element = document.querySelector(selector)

  if (element) {
    return ReactDOM.createPortal(typeof content === 'function' ? content() : content, element)
  }

  throw Error(`No element matched the selector ${selector}.`)
}

/**
 * @param {React.ReactNode} title
 * @param {React.ReactNode | (() => React.ReactNode)} content
 */
export const linkReplace = (title, content) => () => {
  const [replacement, setReplacement] = React.useState(null)

  const handleClick = React.useCallback(() => {
    setReplacement(typeof content === 'function' ? content() : content)
  }, [])

  return replacement || <button onClick={handleClick}>{title}</button>
}
