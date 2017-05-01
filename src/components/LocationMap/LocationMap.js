import React, { PureComponent } from 'react'

/* libraries */
import PropTypes from 'prop-types'
import MapboxGL from 'mapbox-gl'
import { Link } from 'react-router-dom'

/* resources */
import markerIcon from '../../assets/icons/marker.svg'
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
    this.addGeoJsonLayer = this.addGeoJsonLayer.bind(this);
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
      zoom: 14,
      center: [ 9.3728741, 47.4259451 ]
    })

    this.map.on('load', this.addGeoJsonLayer);

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

      var popupContent = window.document.createElement('h2')
      popupContent.innerHTML = loc.name
      popupContent.onclick = () => this.props.history.push(`/location/${loc.slug}`)

      var popup = new MapboxGL.Popup()
        .setLngLat([loc.long, loc.lat])
        .setDOMContent(popupContent)

      var el = document.createElement('div')
      el.className = 'marker'
      el.style.backgroundImage = `url(${markerIcon})`
      el.style.width = '17px'
      el.style.height = '27px'

      var marker = new MapboxGL.Marker(el)
        .setLngLat([loc.long, loc.lat])
        .setPopup(popup)
        .addTo(this.map);

      markers.push(marker)
      return true
    })

    this.setState({ 
      isInitialized: true,
      markers: markers
    });
  }

  render() {
    return (
    	<div className='LocationMap' style={{height: window.innerHeight}}>
        <div className='map-gl' ref={(ref) => { this.mapContainer = ref }} />
        <nav className='nav-view'>
          <img src={listIcon} alt='' />
          <Link to={`/list/${this.props.match.params.filter}`}>
            {this.context.intl.messages['view.list']}
          </Link>
        </nav>
      </div>
    )
  }
}

LocationMap.contextTypes = {
  intl: PropTypes.object
};

export default LocationMap