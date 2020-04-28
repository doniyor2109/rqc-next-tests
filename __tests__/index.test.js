import React from 'react'
import { render } from 'test-utils'
import Prismic from 'prismic-javascript'
import Index from '../pages/index'
import state from './__mocks__/indexState.json'

jest.mock('prismic-javascript')

test('renders deploy link', () => {
  debugger

  const { getByText } = render(<Index />, { initialState: state })
  //   const linkElement = getByText(
  //     /Instantly deploy your Next\.js site to a public URL with ZEIT Now\./
  //   )
  //   expect(linkElement).toBeInTheDocument()
})
