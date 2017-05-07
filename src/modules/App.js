import React, { PureComponent } from 'react'

/* libraries */
import { Redirect, Route } from 'react-router-dom'
import PropTypes from 'prop-types'

/* components */
import Header from '../components/Header/Header'
import List from '../components/List/List'
import LocationMap from '../components/LocationMap/LocationMap'
import Location from '../components/Location/Location'
import Footer from '../components/Footer/Footer'

/* data */
import locations from '../assets/data/locations.json'

/* styles */
import './App.css'

class App extends PureComponent {
  constructor (props) {
    super(props)
    this.locations = locations.data
    this.state = {
      view: 'list',
      filter: 'all',
      filteredLocations: this.locations
    }
    this.availableFilters = ['all' ,'eatdrink' ,'party' ,'places' ,'shopping' ,'saved']
    this.getStateFromURL = this.getStateFromURL.bind(this)
    this.getFilteredLocations = this.getFilteredLocations.bind(this)
  }

  componentDidMount () {
    console.log('[LOG]: App will mount...')
    this.getStateFromURL()
  }

  componentWillReceiveProps (nextProps) {
    console.log('[LOG]: App will receive props...')
    this.getStateFromURL(nextProps)
  }

  getStateFromURL (props = this.props) {
    let view;
    let filter;
    let filteredLocations;

    if( props.match.params.view ) {
      view = props.match.params.view
    }

    if( props.match.params.filter ) {
      filter = props.match.params.filter
      filteredLocations = this.getFilteredLocations(filter)
    }

    this.setState({
      view: view,
      filter: filter,
      filteredLocations: filteredLocations
    })
  }

  getFilteredLocations (filter = this.state.filter) {
    if (filter) {
      if(filter === 'all') return this.locations
      if(filter === 'saved') {
        const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || []
        return this.locations.filter(location => bookmarks.indexOf(location.id) >= 0)
      }

      return this.availableFilters.indexOf(filter) < 0
      ? this.locations.filter(location => location.slug === filter)
      : this.locations.filter(location => location.type === filter)
    }
  }

  render () {
    console.log('[LOG]: App renders...')

    let headerTitle = this.state.view === 'location'
    ? this.state.filteredLocations[0].name
    : this.context.intl.messages[`filter.${this.state.filter}`]

    return (
      <div className='App'>
        <Header options={this.availableFilters} title={headerTitle} />
        { this.state.filteredLocations ? (
          <main>
            <Route exact path='/list/:filter?' render={matchProps => <List locations={this.state.filteredLocations} {...matchProps} />} />
            <Route exact path='/map/:filter?' render={matchProps => <LocationMap locations={this.state.filteredLocations} center={[9.3728741, 47.4259451]} {...matchProps} />} />
            <Route exact path='/location/:slug' render={matchProps => <Location loc={this.state.filteredLocations[0]} {...matchProps} />} />
          </main>
        ) : (
          <Redirect to='/list/all' />
        )}
        <Footer />
      </div>
    )
  }
}

App.contextTypes = {
  intl: PropTypes.object
};

App.propTypes = {
  locations: PropTypes.array
}

export default App
