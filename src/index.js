import React from 'react'

/* libraries */
import { render } from 'react-dom'
import { IntlProvider, addLocaleData } from 'react-intl'

/* modules */
import App from './modules/AppContainer'

/* data */
import en from 'react-intl/locale-data/en'
import de from 'react-intl/locale-data/de'

/* styles */
import 'normalize.css'
import './typography.css'
import './index.css'

addLocaleData([...en, ...de]);

const possibleLanguage = (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage
const stripRegionCode = possibleLanguage.toLowerCase().split(/[_-]+/)[0]
const language = stripRegionCode || possibleLanguage || 'en'
const messages = require('./locales/'+language+'.json')

if (!window.intl) {
	require.ensure([
	  'intl',
	  'intl/locale-data/jsonp/en.js',
	  'intl/locale-data/jsonp/de.js'
	], (require) => {
	  require('intl');
	  require('intl/locale-data/jsonp/en.js')
	  require('intl/locale-data/jsonp/de.js')

	  render(
      <IntlProvider locale={language} messages={messages}>
        <App />
      </IntlProvider>,
      document.getElementById('root')
    );
  });
} else {
  render(
    <IntlProvider locale={language} messages={messages}>
      <App />
    </IntlProvider>,
    document.getElementById('root')
  );
}