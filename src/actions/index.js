import 'whatwg-fetch'

export const LOCATIONS_LOADING = 'LOCATIONS_LOADING'
export const LOCATIONS_READY = 'LOCATIONS_READY'
export const LOCATIONS_ERROR = 'LOCATIONS_ERROR'

export const SET_CATEGORY = 'SET_CATEGORY'
export const USER_TYPING = 'USER_TYPING'
export const SEARCH = 'SEARCH'

export const TOGGLE_MENU = 'TOGGLE_MENU'
export const TOGGLE_IMPRESSUM = 'TOGGLE_IMPRESSUM'
export const SET_VIEW = 'SET_VIEW'
export const OPEN_LOCATION = 'OPEN_LOCATION'

export const TOGGLE_BOOKMARK = 'TOGGLE_BOOKMARK'

export const POSITION_USER = 'POSITION_USER'

export const fetchLocationData = () => {
  return dispatch => {
    dispatch({ type: LOCATIONS_LOADING })
    fetch(process.env.PUBLIC_URL + '/data/locations.json')
      .then(response => response.json())
      .then(json => dispatch({ type: LOCATIONS_READY, locations: json.data }))
      .catch(error => dispatch({ type: LOCATIONS_ERROR, error }))
  }
}

export const setCategory = category => ({
  type: SET_CATEGORY,
  category
})

export const userTyping = bool => ({
  type: USER_TYPING,
  bool
})

export const search = query => ({
  type: SEARCH,
  query
})

export const toggleMenu = bool => ({
  type: TOGGLE_MENU,
  bool
})

export const toggleImpressum = bool => ({
  type: TOGGLE_IMPRESSUM,
  bool
})

export const setView = view => ({
  type: SET_VIEW,
  view
})

export const openLocation = slug => ({
  type: OPEN_LOCATION,
  slug
})

export const toggleBookmark = slug => ({
  type: TOGGLE_BOOKMARK,
  slug
})

export const positionUser = latLong => ({
  type: POSITION_USER,
  latLong
})