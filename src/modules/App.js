import React, { PureComponent } from 'react'

/* libraries */
import { Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Helmet from 'react-helmet'
import { debounce } from 'throttle-debounce';

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
import Impressum from '../components/Impressum/Impressum'

/* resouces */
import {consolelog} from '../assets/utils'

/* styles */
import './App.css'

class App extends PureComponent {
  constructor (props) {
    super(props)
    consolelog('[LOG]: App gets constructed...')
    this.state = {
      hideStart: false,
      unmountStart: false
    }
    this.scrollPosition = 0
    this.availableFilters = ['all' ,'eatdrink' ,'party' ,'places' ,'shopping' ,'saved']
    this.getTitle = this.getTitle.bind(this)
    this.readURL = this.readURL.bind(this)
    this.writeURL = this.writeURL.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
    this.getFilteredLocations = this.getFilteredLocations.bind(this)
  }

  componentWillMount () {
    consolelog('[LOG]: App will mount...')
    this.props.fetchLocationData()
    this.context.router.history.action = 'PUSH'
    this.readURL()
    setTimeout(() => {this.setState(({hideStart: true}))}, 1500)
    setTimeout(() => {this.setState(({unmountStart: true}))}, 2500)
  }

  componentDidMount () {
    window.addEventListener('scroll', debounce(100, () => { this.handleScroll() }));
  }

  componentWillReceiveProps (nextProps) {
    consolelog('[LOG]: App will receive props...')
    /* if user clicked back button: Read in url */
    if (this.context.router.history.action === 'POP') {
      this.readURL(nextProps)
    } else {
      this.writeURL(nextProps)
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.view === 'location' && this.props.view === 'list') {
      setTimeout(() => {window.scrollTo(0, this.scrollPosition)}, 50)
    }
  }

  readURL (props = this.props) {
    consolelog('[LOG]: App reads URL...')
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

    if (view === props.view && filter === props.filter) {
      return true
    }

    /* url incomplete */
    if (view === undefined || view === '') {
      view = 'list'
    }
    if (filter === undefined || filter === '') {
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
    consolelog('[LOG]: App writes URL...')
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
    consolelog('[LOG]: Filter Locations...')
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
        /* slug */
        if (location.slug === query) return true

        /* name */
        if (location.name.toLowerCase().indexOf(query.toLowerCase()) >= 0) return true

        /* tags */
        if (location[`tags_${locale}`] !== null) {
          if (location[`tags_${locale}`].toLowerCase().indexOf(query.toLowerCase()) >= 0) return true
        }

        /* description */
        if (location[`description_${locale}`] !== null) {
          if (location[`description_${locale}`].toLowerCase().indexOf(query.toLowerCase()) >= 0) return true
        }

        /* nothing found */
        return false
      })

    }
    return locations
  }

  handleScroll (event) {
    if (this.props.view === 'list') {
      this.scrollPosition = document.body.scrollTop
    }
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
    consolelog('[LOG]: App renders...')
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
      showResults,
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
        <Helmet>
          <title>{`${this.context.intl.messages['AppName']} ${this.getTitle()}`}</title>
          <meta name="description" content={`${this.context.intl.messages['description']}`} />
        </Helmet>
        <Header
          title={this.getTitle()}
          handleMenuClick={this.props.toggleMenu}
        >
          <Menu
            showMenu={showMenu}
            searchOpen={searchOpen}
            handleMenuClick={this.props.toggleMenu}
          >
            <Navigation
              view={view}
              show={showMenu}
              handleSearchIconClick={() => { userTyping(true) }}
              handleLangSwitchClick={this.props.updateIntl}
              handleImpressumClick={this.props.toggleImpressum}
              searchOpen={searchOpen}
              search={search}
              query={query}
              showResults={showResults}
              handleLinkClick={this.props.setCategory}
              options={this.availableFilters}
            />
          </Menu>
        </Header>
        <Impressum
          toggleImpressum={this.props.toggleImpressum}
          showImpressum={this.props.showImpressum}
        />
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
                  bookmarks={bookmarks}
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
