import React, { PureComponent } from 'react'

/* libraries */
import PropTypes from 'prop-types'
import MapboxGL from 'mapbox-gl'
import { Link } from 'react-router-dom'

/* components */
import Oops from '../Oops/Oops'

/* resources */
import markerIcon from '../../assets/icons/marker.svg'
import savedIcon from '../../assets/icons/marker_gold.svg'
import listIcon from '../../assets/icons/list.svg'

/* styles */
import 'mapbox-gl/dist/mapbox-gl.css'
import './LocationMap.css'

class LocationMap extends PureComponent {

  static childContextTypes = {
    map: PropTypes.object
  }

  constructor(props) {
    super(props)

    this.state = {
      isInitialized: false
    }

    this.initMap = this.initMap.bind(this)
    this.addGeoJsonLayer = this.addGeoJsonLayer.bind(this)
    this.controlGeoLocation = this.controlGeoLocation.bind(this)
    this.positionUser = this.positionUser.bind(this)
    this.flyToMarker = this.flyToMarker.bind(this)
    this.isInLocation = this.props.match === undefined
  }

  componentDidMount() {
    this.initMap()
  }

  componentWillReceiveProps() {
    this.addGeoJsonLayer()
  }

  componentDidUpdate(prevProps) {
    if(prevProps !== this.props) {
      this.addGeoJsonLayer()
    }
  }

  initMap() {
    if (!this.mapContainer || this.map) {
      return false
    }

    MapboxGL.accessToken = 'pk.eyJ1IjoiYW5nZWxvemVociIsImEiOiJjaWhhZm1raG4wMDVydjhrbG5vZjB1ZnZmIn0.5JpOEiwxrrLzM0NjymAfTQ'

    this.map = new MapboxGL.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/angelozehr/cj09uj68600b12smzwwt078qx',
      logoPosition: 'top-left',
      zoom: 14,
      center: this.props.center
    })

    this.map.on('load', this.addGeoJsonLayer)

    return true
  }

  addGeoJsonLayer() {

    if( this.state.isInitialized ) {
      this.state.markers.map((marker, index) => {
        marker._element.remove()
        return true
      })
    }

    let markers = this.state.markers || []

    this.props.locations.map((loc, index) => {

      const popupContent = window.document.createElement('h2')
      popupContent.innerHTML = loc.name
      popupContent.onclick = () => this.props.openLocation(loc.slug)

      const popup = new MapboxGL.Popup()
        .setLngLat([loc.long, loc.lat])
        .setDOMContent(popupContent)

      const icon = this.props.bookmarks.indexOf(loc.slug) >= 0
      ? savedIcon
      : markerIcon

      const el = document.createElement('div')
      el.className = 'marker'
      el.innerHTML = `<img src='${icon}' alt='' />`
      el.style.width = '17px'
      el.style.height = '27px'
      el.onclick = () => this.flyToMarker([loc.long, loc.lat])

      const marker = new MapboxGL.Marker(el)
        .setLngLat([loc.long, loc.lat])
        .setPopup(popup)
        .addTo(this.map)

      if(this.props.locations.length === 1) {
        marker.togglePopup()
      }

      markers.push(marker)
      return true
    })

    this.controlGeoLocation()

    this.setState({
      isInitialized: true,
      markers: markers
    })
  }

  controlGeoLocation() {
    if( !this.hasOwnProperty('geolocate')) {
      this.geolocate = new MapboxGL.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        }
      })
      this.map.addControl(this.geolocate, 'top-left')
      this.geolocate.on('geolocate', this.positionUser)
    }
  }

  flyToMarker(longLat) {
    if (longLat) this.map.flyTo({center: longLat});
  }

  positionUser(data) {
    if( !this.state.hasOwnProperty('user')) {
      const el = document.createElement('div')
      el.className = 'marker'
      const pin = document.createElement('div')
      pin.className = 'LocationMap-user-pin'
      const effect = document.createElement('div')
      effect.className = 'LocationMap-user-pin-effect'
      el.appendChild(pin)
      el.appendChild(effect)

      const user = new MapboxGL.Marker(el)
        .setLngLat([data.coords.longitude, data.coords.latitude])
        .addTo(this.map)

      this.setState({ user: user })
    } else {
      this.state.user.setLngLat([data.coords.longitude, data.coords.latitude])
    }
    this.props.positionUser([data.coords.longitude, data.coords.latitude])
  }

  render() {
    return (
    	<div className='LocationMap' style={{height: !this.isInLocation ? window.innerHeight : '100%'}}>
        <div className='map-gl' ref={(ref) => { this.mapContainer = ref }} />
        {this.props.locations.length === 0 ? (
          <Oops message={this.context.intl.messages['no.results']} />
        ) : !this.isInLocation && (
          <nav className='nav-view'>
            <img src={listIcon} alt='' />
            <Link to={`/list/${this.props.match.params.category}`} onClick={() => this.props.handleNavSwitchClick('list')}>
              {this.context.intl.messages['view.list']}
            </Link>
          </nav>
        )}
      </div>
    )
  }
}

LocationMap.contextTypes = {
  intl: PropTypes.object.isRequired
}

LocationMap.defaultProps = {
  handleNavSwitchClick: () => true,
  openLocation: () => true,
  bookmarks: []
}

LocationMap.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.object).isRequired,
  center: PropTypes.array.isRequired,
  positionUser: PropTypes.func.isRequired,
  handleNavSwitchClick: PropTypes.func,
  openLocation: PropTypes.func,
  bookmarks: PropTypes.array
}

export default LocationMap