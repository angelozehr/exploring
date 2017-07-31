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
  showRestults: false,
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
        showRestults: false
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
        showMenu: false,
        searchOpen: true,
        showRestults: true
      }
    case TOGGLE_MENU:
      return {
        ...state,
        showMenu: action.bool === typeof bool ? action.bool : !state.showMenu,
        searchOpen: false,
        query: '',
        showRestults: false
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
        showMenu: false,
        showRestults: false
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