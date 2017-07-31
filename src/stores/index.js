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
import ch from '../assets/locales/ch.json'
import de from '../assets/locales/de.json'
import en from '../assets/locales/en.json'

/* read bookmarks from localstorage */
const persistedState = loadState() || []

/* define locale */
const possibleLanguage = (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage
const stripRegionCode = possibleLanguage.toLowerCase().split(/[_-]+/)[0]
const locale = persistedState.userLocale || stripRegionCode || possibleLanguage || 'en'
const messages = { 'en': en, 'de': de, 'ch': ch }

const initialIntlState = {
  intl: {
    defaultLocale: 'de',
    locale: locale,
    messages: messages[locale]
  }
}

/* combine the two */
const initialState = {
  ...initialIntlState,
  bookmarks: persistedState.bookmarks
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
  saveState({
    bookmarks: store.getState().bookmarks,
    userLocale: store.getState().intl.locale
  })
}, 1000))

export default store