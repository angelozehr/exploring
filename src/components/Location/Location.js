import React, { PureComponent } from 'react'

/* libraries */
import PropTypes from 'prop-types'

/* components */
import LocationMap from '../LocationMap/LocationMap'

/* styles */
import './Location.css'

class Location extends PureComponent {

  render () {
    console.log('[LOG]: Location renders...')

    let hours = []

    if (this.props.loc[`open_${this.context.intl.locale}`]) {
      hours = this.props.loc[`open_${this.context.intl.locale}`].split(', ')
    }

    return (
      <div className='Location'>
      	<div className='Location-image'>
          {this.props.loc.image !== null &&
            <img src={`${process.env.PUBLIC_URL}/images/${this.props.loc.image}`} alt='' />
          }
          <article className='Location-description'>
            <p>{this.props.loc.de}</p>
            <aside>{this.props.loc.address}</aside>
            <ul className='Location-hours'>
              {hours.map(line => (
                <li key={line.replace(/[^\w\s]/gi, '')}>{line}</li>
              ))}
            </ul>
            {this.props.loc.phone !== null &&
              <aside>
                {this.props.loc.phone}
              </aside>
            }
            {this.props.loc.website !== null && 
              <aside>
                <a href='{this.props.loc.website}' target='_blank'>
                  {this.props.loc.website.replace(/(^\w+:|^)\/\//, '')}
                </a>
              </aside>
            }
          </article>
          <div className='Location-Map'>
            <LocationMap locations={[this.props.loc]} center={[this.props.loc.long, this.props.loc.lat]} />
          </div>
      	</div>
      </div>
    )
  }
}

Location.contextTypes = {
  intl: PropTypes.object
};

Location.propTypes = {
  loc: PropTypes.object.isRequired
}

export default Location