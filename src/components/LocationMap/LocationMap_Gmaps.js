import React, { PureComponent } from 'react'

/* libraries */
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps'
import withScriptjs from 'react-google-maps/lib/async/withScriptjs'

/* resources */
import markerIcon from '../../assets/icons/marker.svg'
import listIcon from '../../assets/icons/list.svg'

/* styles */
import './LocationMap.css'

const AsyncGettingStartedExampleGoogleMap = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={17}
      defaultCenter={{ lat: 47.4259451, lng: 9.3728741 }}
      onClick={() => true}
    >
      {props.markers.map((marker, index) => (
        <Marker
          key={`marker-${index}`}
          position={{ lat: marker.lat, lng: marker.long }}
          onClick={() => props.onMarkerClick(marker)}
          icon={markerIcon}
        >
          {marker.showInfo && (
            <InfoWindow onCloseClick={() => props.onMarkerClose(marker)}>
              <div>
                <a onClick={() => props.history.push(`/location/${marker.slug}`)}>{marker.name}</a>
              </div>
            </InfoWindow>
          )}
        </Marker>
      ))}
    </GoogleMap>
  ))
)

class LocationMap extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      markers: this.props.locations
    }
    this.handleMarkerClick = this.handleMarkerClick.bind(this);
    this.handleMarkerClose = this.handleMarkerClose.bind(this);
  }

  handleMarkerClick(targetMarker) {
    this.setState({
      markers: this.state.markers.map(marker => {
        if (marker === targetMarker) {
          return {
            ...marker,
            showInfo: true,
          };
        }
        return marker;
      }),
    });
  }

  handleMarkerClose(targetMarker) {
    this.setState({
      markers: this.state.markers.map(marker => {
        if (marker === targetMarker) {
          return {
            ...marker,
            showInfo: false,
          };
        }
        return marker;
      }),
    });
  }

  render () {
    console.log('[LOG]: LocationMap renders...')

    return (
      <div className='LocationMap' style={{height: window.innerHeight}}>
        <AsyncGettingStartedExampleGoogleMap
          googleMapURL='https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyC8XhsU5D8coph9BYW4ogmgy3BHE6nJT1c'
          loadingElement={
            <div style={{ height: `100%` }} />
          }
          containerElement={
            <div style={{ height: `100%` }} />
          }
          mapElement={
            <div style={{ height: `100%` }} />
          }
          markers={this.state.markers}
          history={this.props.history}
          onMarkerClick={this.handleMarkerClick}
          onMarkerClose={this.handleMarkerClose}
        />
        <nav className='nav-view'>
          <img src={listIcon} alt='' />
          <Link to={`/list/${this.props.match.params.category}`}>
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

LocationMap.propTypes = {
  locations: PropTypes.array.isRequired
}

export default LocationMap