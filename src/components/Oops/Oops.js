import React, { PureComponent } from 'react'

/* libraries */
import PropTypes from 'prop-types'

/* resources */
import senfIcon from '../../assets/icons/senf.gif'

/* styles */
import './Oops.css'

class Oops extends PureComponent {
  render () {
    return (
      <div className='Oops'>
        <div className='error'>
          <h1 className='error-title'>Oops!</h1>
          <h3 className='error-message'>{this.props.message}</h3>
          <img src={senfIcon} className='error-icon' alt='Oops' />
        </div>
      </div>
    )
  }
}

Oops.PropTypes = {
  message: PropTypes.string.isRequired
}

export default Oops