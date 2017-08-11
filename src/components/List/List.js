import React, { PureComponent } from 'react'

/* libraries */
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Link } from 'react-router-dom'
import {point as TurfPoint} from '@turf/helpers';
import TurfDistance from '@turf/distance';

/* components */
import Oops from '../Oops/Oops'

/* resources */
import mapIcon from '../../assets/icons/map.svg'
import {consolelog} from '../../assets/utils'

/* styles */
import './List.css'

class List extends PureComponent {

  constructor (props) {
    super(props)
    this.state = {
      touched: -1
    }
    this.handleTouchStart = this.handleTouchStart.bind(this)
    this.handleTouchEnd = this.handleTouchEnd.bind(this)
    this.getDistance = this.getDistance.bind(this)
  }

  handleTouchStart (index) {
    consolelog('[LOG]: List touched...')
  }

  handleTouchEnd () {
    consolelog('[LOG]: List touch ended...')
  }

  getDistance (longLat) {
    const {
      userPosition
    } = this.props
    if (userPosition !== undefined && longLat) {
      const from = TurfPoint(longLat);
      const to = TurfPoint(userPosition);

      const distance = TurfDistance(from, to, "meters");
      return `${Math.round(parseInt((distance) / 10, 10) * 10)} m`
    }
    return ''
  }

  render () {
    consolelog('[LOG]: List renders...')

    const {
      category,
      locations,
      bookmarks
    } = this.props

    return (
      <div className='List'>
        {locations.map((location, index) => (
          <Link
            to={`/location/${location.slug}`}
            key={`link-${index}`}
            onClick={() => this.props.handleClick(location.slug)}
            className='List-Link'
          >
            <section
              className={classnames('List-location', {'List-location__saved': bookmarks.indexOf(location.slug) >= 0, 'List-location__touch': index === this.state.touched})}
              onTouchStart={() => this.handleTouchStart(index)}
              onTouchEnd={this.handleTouchEnd}
            >
              <figure
                className='List-location-image'
                style={{backgroundImage: `url(${process.env.PUBLIC_URL}/images/${location.slug}/1_${location.slug}.jpg)`}}
              >
                <div className='List-location-overlay'>
                  <h3>{location.name}</h3>
                  <aside className='List-location-distance'>
                    {this.getDistance([parseFloat(location.long), parseFloat(location.lat)])}
                  </aside>
                </div>
              </figure>
            </section>
          </Link>
        ))}
        {locations.length === 0 ? (
          <Oops message={this.context.intl.messages['no.results']} />
        ) : (
          <nav className='nav-view'>
            <img src={mapIcon} alt='' />
            <Link to={`/map/${category}`} onClick={() => this.props.handleNavSwitchClick('map')}>
              {this.context.intl.messages['view.map']}
            </Link>
          </nav>
        )}
      </div>
    )
  }
}

List.contextTypes = {
  intl: PropTypes.object.isRequired
}

List.defaultProps = {
  handleNavSwitchClick: () => true
}

List.propTypes = {
  category: PropTypes.string.isRequired,
  locations: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired,
  userPosition: PropTypes.array,
  handleNavSwitchClick: PropTypes.func
}

export default List