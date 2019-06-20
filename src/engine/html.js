// @ts-check
import React from 'react'
import ReactDOM from 'react-dom'
import Tippy from '@tippy.js/react'

import { get } from './story'

/**
 * Converts a template literal into a react node array.
 *
 * @param {TemplateStringsArray} strings
 * @param  {...React.ReactNode} values
 * @return {React.ReactNodeArray}
 */
export function pragma (strings, ...values) {
  return strings.map((string, i) => (
    <React.Fragment key={i}>
      {string.replace(/\$[a-z.]+/ig, get)}
      {getContent(values[i])}
    </React.Fragment>
  ))
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
export function image (url, alt) {
  return <Image {...{ url, alt }} />
}

function Image ({ url, alt }) {
  return <img src={url} alt={alt} />
}

/**
 * @param {React.ReactNode} title
 * @param {() => void} callback
 */
export function button (title, callback) {
  return <Button {...{ title, callback }} />
}

function Button ({ title, callback }) {
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
export function listBox (options, onChange, selected) {
  return <ListBox {...{ options, onChange, selected }} />
}

function ListBox ({ options, onChange, selected }) {
  const entries = Object.entries(options)
  const defaultValue = selected || entries[0][0]

  const handleChange = event => {
    onChange(event.target.value)
  }

  React.useEffect(() => {
    onChange(defaultValue)
  }, [defaultValue, onChange])

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
export function replaceable (id, callback) {
  return <Replaceable {...{ id, callback }} />
}

function Replaceable ({ id, callback }) {
  return <div id={id}>{getContent(callback)}</div>
}

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
export function link (title, callback) {
  return <Link {...{ title, callback }} />
}

function Link ({ title, callback }) {
  // eslint-disable-next-line no-unused-vars
  const [content, updateContent] = useContentUpdate(callback)
  return <React.Fragment>
    <button onClick={updateContent}>{title}</button>
    {content}
  </React.Fragment>
}

/**
 * Creates a link which appends the content once clicked.
 * Or alternatively, executes the content as a callback and appends the result.
 *
 * @param {React.ReactNode} title
 * @param {Content} callback
 */
export function linkAppend (title, callback) {
  return <LinkAppend {...{ title, callback }} />
}

function LinkAppend ({ title, callback }) {
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
export function replace (selector, callback) {
  return <Replace {...{ selector, callback }} />
}

function Replace ({ selector, callback }) {
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
export function linkReplace (title, callback) {
  return <LinkReplace {...{ title, callback }} />
}

function LinkReplace ({ title, callback }) {
  const [content, updateContent] = useContentUpdate(callback)

  if (content != null) {
    return <React.Fragment>{content}</React.Fragment>
  }

  return <button onClick={updateContent}>{title}</button>
}

/**
 * Displays a note block.
 * @param {Content} callback
 */
export function note (callback) {
  return <Note {...{ callback }} />
}

function Note ({ callback }) {
  return (
    <blockquote className="note">
      {getContent(callback)}
    </blockquote>
  )
}

/**
 * Displays a tooltip.
 * @param {Content} title
 * @param {Content} callback
 */
export function tip (title, callback) {
  return <Tip {...{ title, callback }} />
}

function Tip ({ title, callback }) {
  const tooltip = getContent(title)
  const content = getContent(callback)

  if (!tooltip) {
    return <React.Fragment>{content}</React.Fragment>
  }

  // @ts-ignore
  return <Tippy content={tooltip}><span>{content}</span></Tippy>
}

/**
 * Makes the first latter in a string into a fansy schmancy letter.
 * @param {string} content
 */
export function fancyFirstLetter (content) {
  return <FancyFirstLetter {...{ content }} />
}

function FancyFirstLetter ({ content }) {
  return (
    <React.Fragment>
      <span className="firstcharacter">{content.substring(0, 1)}</span>
      {content.substring(1)}
    </React.Fragment>
  )
}

/**
 * Displays an error message.
 * @param {Error} error
 */
export function errorMessage (error) {
  return <ErrorMessage {...{ error }} />
}

function ErrorMessage ({ error }) {
  return (
    <span className={'error'}>
      <span>{error.name}</span>
      <span>{error.message}</span>
    </span>
  )
}

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
  try {
    return typeof callback === `function` ? callback() : callback
  } catch (error) {
    console.error(error)
    return errorMessage(error)
  }
}
