/* libraries */
import { combineReducers } from 'redux'
import { intlReducer } from 'react-intl-redux'

/* actions */
import { LOCATIONS_LOADING, 
  LOCATIONS_READY,
  LOCATIONS_ERROR,
  SET_CATEGORY,
  USER_TYPING,
  SEARCH,
  TOGGLE_MENU,
  TOGGLE_IMPRESSUM,
  SET_VIEW,
  OPEN_LOCATION,
  TOGGLE_BOOKMARK,
  POSITION_USER } from '../actions'

const locationReducer = (state = {
  locationsLoading: true,
  locations: [{}]
}, action) => {
  switch (action.type) {
    case LOCATIONS_LOADING:
      return {
        ...state,
        locationsLoading: true
      }
    case LOCATIONS_READY:
      return {
        ...state,
        locations: action.locations,
        locationsLoading: false
      }
    case LOCATIONS_ERROR:
      return {
        ...state,
        locationsLoading: false,
        locationsError: action.error
      }
    default:
      return state
  }
}

const appReducer = (state = {
  category: 'all',
  showMenu: false,
  searchOpen: false,
  showResults: false,
  showImpressum: false,
  query: '',
  view: 'list'
}, action) => {
  switch (action.type) {
    case SET_CATEGORY:
      return {
        ...state,
        category: action.category,
        showMenu: false,
        query: '',
        showResults: false,
        searchOpen: false,
        view: state.view === 'location' ? 'list' : state.view
      }
    case USER_TYPING:
      return {
        ...state,
        searchOpen: action.bool
      }
    case SEARCH:
      return {
        ...state,
        query: action.query,
        view: ['list', 'map'].indexOf(state.view) > -1 ? state.view : 'list',
        showMenu: false,
        searchOpen: true,
        showResults: true
      }
    case TOGGLE_MENU:
      return {
        ...state,
        showMenu: action.bool === typeof bool ? action.bool : !state.showMenu,
        searchOpen: false,
        query: '',
        showResults: false
      }
    case TOGGLE_IMPRESSUM:
      return {
        ...state,
        showImpressum: action.bool === typeof bool ? action.bool : !state.showImpressum
      }
    case SET_VIEW:
      return {
        ...state,
        view: action.view
      }
    case OPEN_LOCATION:
      return {
        ...state,
        view: 'location',
        singleLocation: action.slug,
        query: '',
        showResults: false
      }
    case POSITION_USER:
      return {
        ...state,
        userPosition: action.latLong
      }
    default:
      return state
  }
}

const bookmarkReducer = (state = {
  bookmarks: []
}, action) => {
  switch (action.type) {
    case TOGGLE_BOOKMARK:
      if (state.bookmarks.indexOf(action.slug) < 0) {
        return {
          ...state,
          bookmarks: [...state.bookmarks, action.slug]
        }
      }
      return {
        ...state,
        bookmarks: state.bookmarks.filter(bookmark => bookmark !== action.slug)
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  locations: locationReducer,
  app: appReducer,
  bookmarks: bookmarkReducer,
  intl: intlReducer
})

export default rootReducer