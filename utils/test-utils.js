// test-utils.js
import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from '../redux/reducers/index'
import I18n from 'redux-i18n'

import { translations } from '../i18n/translations'

function render(
  ui,
  {
    initialState = {},
    store = createStore(reducer, initialState),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <I18n translations={translations} initialLang="ru">
          {children}
        </I18n>
      </Provider>
    )
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

// re-export everything
export * from '@testing-library/react'

// override render method
export { render }
