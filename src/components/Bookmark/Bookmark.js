import React, { PureComponent } from 'react'

/* libraries */
import PropTypes from 'prop-types'

/* resources */
import heartIcon from '../../assets/icons/heart.svg'
import heartedIcon from '../../assets/icons/hearted.svg'

import './Bookmark.css'

class Bookmark extends PureComponent {

  render () {
    const { saved } = this.props
    return (
      <div className='Bookmark' onClick={this.props.handleClick}>
        <img src={saved ? heartedIcon : heartIcon } className='Bookmark-icon' alt='' />
      </div>
    )
  }
}

Bookmark.defaultProps = {
  saved: false
}

Bookmark.propTypes = {
  saved: PropTypes.bool,
  handleClick: PropTypes.func.isRequired
}

export default Bookmark