import React from 'react'
import { Start } from '../../EssentialEstablishmentGenerator/Start/Start'
import { StoryInit } from '../../EssentialEstablishmentGenerator/Start/StoryInit'

/**
 * The application main content body.
 * @type {React.FC}
 */
const Content = () => {
  StoryInit()
  return <main className="content">{Start()}</main>
}

export default Content
