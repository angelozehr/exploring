import React, { PureComponent } from 'react'

/* libraries */
import { Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import classnames from 'classnames'

/* components */
import Start from '../components/Start/Start'
import Header from '../components/Header/Header'
import Menu from '../components/Menu/Menu'
import Navigation from '../components/Navigation/Navigation'
import List from '../components/List/List'
import LocationMap from '../components/LocationMap/LocationMap'
import Location from '../components/Location/Location'
import Footer from '../components/Footer/Footer'
import Oops from '../components/Oops/Oops'

/* resources */


/* styles */
import './App.css'

class App extends PureComponent {
  constructor (props) {
    super(props)
    console.log('[LOG]: App gets constructed...')
    this.state = {
      hideStart: false,
      unmountStart: false
    }

    this.availableFilters = ['all' ,'eatdrink' ,'party' ,'places' ,'shopping' ,'saved']
    this.getTitle = this.getTitle.bind(this)
    this.readURL = this.readURL.bind(this)
    this.writeURL = this.writeURL.bind(this)
    this.getFilteredLocations = this.getFilteredLocations.bind(this)
  }

  componentWillMount () {
    console.log('[LOG]: App will mount...')
    this.props.fetchLocationData()
    this.readURL()
    setTimeout(() => {this.setState(({hideStart: true}))}, 1500)
    setTimeout(() => {this.setState(({unmountStart: true}))}, 2500)
  }

  componentWillReceiveProps (nextProps) {
    console.log('[LOG]: App will receive props...')
    this.writeURL(nextProps)
  }

  readURL (props = this.props) {
    const {
      openLocation,
      search,
      setView,
      setCategory
    } = props

    let { 
      view,
      filter
    } = props.match.params

    /* url incomplete */
    if (view === undefined) {
      view = 'list'
    }
    if (filter === undefined) {
      filter = 'all'
    }
    /* location */
    if (view === 'location') {
      openLocation(filter)
    } else {
      /* list or map */
      if (['list', 'map'].indexOf(view) >= 0) {
        setView(view)
      }
      /* query or category */
      if (this.availableFilters.indexOf(filter) >= 0) {
        setCategory(filter)
      } else {
        search(filter)
      }
    }
    this.writeURL(props)
  }

  writeURL (props = this.props) {
    const {
      view,
      query,
      category,
      singleLocation
    } = props

    const {
      history
    } = this.context.router

    let filter = 'all'
    /* location */
    if (view === 'location') {
      filter = singleLocation
    }
    /* category */
    if (['list', 'map'].indexOf(view) >= 0) {
      filter = category
    }
    /* query */
    if (query !== '') {
      filter = query
    }

    if (props.match.params.view !== view || props.match.params.filter !== filter) {
      history.push(`/${view}/${filter}`)
    }
  }

  getFilteredLocations () {
    console.log('[LOG]: Filter Locations...')
    const {
      locationsLoading,
      locations,
      category,
      query,
      locale
    } = this.props

    if (locationsLoading) return false

    if (category !== undefined && query === '') {
      /* no category */
      if(category === 'all') return locations

      /* bookmarks */
      if(category === 'saved') {
        const { bookmarks } = this.props
        return locations.filter(location => bookmarks.indexOf(location.slug) >= 0)
      }

      /* category */
      if (this.availableFilters.indexOf(category) >= 0) {
        return locations.filter(location => location.type === category)
      }
    }

    if (query !== '') {
      /* query */
      return locations.filter(location => {
        if(location.slug === query) return true
        if(location.name.toLowerCase().indexOf(query.toLowerCase()) >= 0) return true
        if(location[`tags_${locale}`].toLowerCase().indexOf(query.toLowerCase()) >= 0) return true
        return false
      })

    }
    return locations
  }

  getTitle () {
    const {
      category,
      view,
      messages,
      locations,
      singleLocation
    } = this.props

    let title = messages.AppName

    title = view === 'location'
    ? locations.find(location => location.slug === singleLocation).name
    : messages[`category.${category}`]
    return title
  }

  render () {
    console.log('[LOG]: App renders...')
    const {
      locale,
      bookmarks,
      category,
      view,
      setView,
      showMenu,
      searchOpen,
      search,
      query,
      userTyping,
      showRestults,
      locations,
      singleLocation,
      toggleBookmark,
      positionUser,
      openLocation,
      userPosition
    } = this.props

    const filteredLocations = this.getFilteredLocations()

    /* while loading */
    if (this.props.locationsLoading) {
      return (
        <Start />
      )
    }

    /* if error */
    if (this.props.locationsError instanceof Error || this.props.translationsError instanceof Error ) {
      const error = this.props.locationsError instanceof Error
      ? this.props.locationsError
      : this.props.translationsError
      
      return (
        <Oops message={error.message} />
      )
    }

    /* when locations ready */
    return (
      <div className={classnames('App', {'App__noscroll': !this.state.hideStart})}>
        {!this.state.unmountStart && <Start hidden={this.state.hideStart} />}
        <Header title={this.getTitle()}>
          <Menu
            searchOpen={searchOpen}
            handleClick={this.props.toggleMenu}>
            <Navigation
              view={view}
              show={showMenu}
              handleSearchIconClick={() => { userTyping(true) }}
              searchOpen={searchOpen}
              search={search}
              query={query}
              showRestults={showRestults}
              handleClick={this.props.setCategory}
              options={this.availableFilters}
            />
          </Menu>
        </Header>
        <main>
          <Switch>
            <Route
              exact
              path='/list/:category?'
              render={matchProps =>
                <List
                  category={category}
                  locations={filteredLocations}
                  handleClick={openLocation}
                  userPosition={userPosition}
                  bookmarks={bookmarks}
                  handleNavSwitchClick={setView}
                />
              }
            />
            <Route
              exact
              path='/map/:category?'
              render={matchProps => 
                <LocationMap
                  {...matchProps}
                  locations={filteredLocations}
                  center={[9.3728741, 47.4259451]}
                  positionUser={positionUser}
                  handleNavSwitchClick={setView}
                  openLocation={openLocation}
                />
              }
            />
            <Route
              exact
              path='/location/:slug'
              render={matchProps => 
                <Location
                  singleLocation={locations.find(location => location.slug === singleLocation)}
                  locale={locale}
                  handleBookmarkClick={toggleBookmark}
                  bookmarks={bookmarks}
                  positionUser={positionUser}
                />
              }
            />
            <Route component={Oops} />
          </Switch>
        </main>
        <Footer />
      </div>
    )
  }
}

App.contextTypes = {
  router: PropTypes.object,
  intl: PropTypes.object
};

App.propTypes = {
  locations: PropTypes.array
}

export default App
