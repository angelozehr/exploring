import React, { PureComponent } from 'react'

/* libraries */
import PropTypes from 'prop-types'

/* styles */
import './Header.css';

class Header extends PureComponent {
  render () {
    return (
      <div className='Header'>
        <h1 onClick={this.props.handleMenuClick}>
          {this.props.title}
        </h1>
        {this.props.children}
      </div>
    )
  }
}

Header.defaultProps = {
  title: 'St.Gallen'
}

Header.propTypes = {
  title: PropTypes.string,
  handleMenuClick: PropTypes.func.isRequired
}

export default Header