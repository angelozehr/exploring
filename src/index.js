import 'babel-polyfill'
import React from 'react'

/* libraries */
import { render } from 'react-dom'
import { Provider } from 'react-intl-redux'
import { addLocaleData } from 'react-intl'
import Raven from 'raven-js';

/* modules */
import App from './modules/AppContainer'

/* store */
import store from './stores';

/* styles */
import 'normalize.css'
import './typography.css'
import './index.css'

/* langaugage data */
import ch from './assets/locales/ch.js'
import en from 'react-intl/locale-data/en'
import de from 'react-intl/locale-data/de'

addLocaleData([...en, ...de, ...ch])

Raven
  .config('https://a9bde506cb944b6999767942bba9704a@sentry.io/193174')
  .install()

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)