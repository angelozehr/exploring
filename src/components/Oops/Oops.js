import React, { PureComponent } from 'react'

/* libraries */
import PropTypes from 'prop-types'

/* resources */
import heart from '../../assets/icons/heart.svg'
import senfIcon from '../../assets/icons/senf.gif'

/* styles */
import './Oops.css'

class Oops extends PureComponent {
  render () {
    const {params} = this.context.router.route.match
    const {messages} = this.context.intl
    if (params.hasOwnProperty('category') && params.category === 'saved') {
      return (
        <div className='Oops'>
          <div className='Oops-howto'>
            <img src={heart} alt='<3' className='Oops-heart' />
            <br />
            {messages['addBookmarks']}
          </div>
        </div>
      )
    }

    return (
      <div className='Oops'>
        <div className='Oops-error'>
          <h1 className='Oops-error-title'>Oops!</h1>
          <h3 className='Oops-error-message'>{this.props.message}</h3>
          <img src={senfIcon} className='Oops-error-icon' alt='Oops' />
        </div>
      </div>
    )
  }
}

Oops.contextTypes = {
  intl: PropTypes.object,
  router: PropTypes.object
}

Oops.PropTypes = {
  message: PropTypes.string.isRequired
}

export default Oops