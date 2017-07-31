/* libraries */
import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import throttle from 'lodash/throttle'

/* reducer */
import reducer from '../reducers'

/* utils */
import { loadState, saveState } from '../assets/utils/localstorage.js'

/* localisation */
import de from '../assets/locales/de.json'
import en from '../assets/locales/en.json'

const possibleLanguage = (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage
const stripRegionCode = possibleLanguage.toLowerCase().split(/[_-]+/)[0]
const locale = stripRegionCode || possibleLanguage || 'en'
const messages = { 'en': en, 'de': de }

const initialIntlState = {
  intl: {
    defaultLocale: locale,
    locale: locale,
    messages: messages[locale]
  }
}

/* read bookmarks from localstorage */
const persistedState = loadState()
const bookmarks = persistedState !== typeof undefined 
? persistedState
: []

const initialAppState = {
  bookmarks: bookmarks
}

/* combine the two */
const initialState = {
  ...initialIntlState,
  ...initialAppState
}

/* add thunk and logger */
const enhancers = compose(
  applyMiddleware(thunk, logger),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)

/* create store */
const store = createStore(
  reducer,
  initialState,
  enhancers
)

/* persist bookmarks in localstorage */
store.subscribe(throttle(() => {
  console.dir(store.getState())
  saveState({
    bookmarks: store.getState().bookmarks.bookmarks
  })
}, 1000))

export default store