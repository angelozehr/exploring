import React, { PureComponent } from 'react'

/* libraries */
import PropTypes from 'prop-types'

/* styles */
import './Location.css'

class Location extends PureComponent {

  render () {
    console.log('[LOG]: Location renders...')

    return (
      <div className='Location'>
      	<div className='Location-image'>
          <img src={`${process.env.PUBLIC_URL}/images/${this.props.loc.image}`} alt='' />
          <article className='Location-description'>
            <p>{this.props.loc.de}</p>
          </article>
      	</div>
      </div>
    )
  }
}

Location.propTypes = {
  loc: PropTypes.object.isRequired
}

export default Location