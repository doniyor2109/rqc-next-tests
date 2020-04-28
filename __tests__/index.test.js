import React from 'react'
import { render } from 'test-utils'
import Index from '../pages/index'
import state from './__mocks__/indexState.json'

jest.mock('prismic-javascript')

test('renders index with news teasets', () => {
  const { getByText } = render(<Index />, { initialState: state })
  const linkElement = getByText('News')
  expect(linkElement).toBeInTheDocument()
})
