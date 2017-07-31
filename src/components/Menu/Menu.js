import React, { PureComponent } from 'react'

/* libraries */
import PropTypes from 'prop-types'
import classnames from 'classnames'

/* styles */
import './Menu.css'

class Menu extends PureComponent {

  render() {
    console.log('[LOG]: Menu renders...')

    return (
      <div className={classnames('Menu', {'menu_state_open': (this.props.showMenu || this.props.searchOpen)})}>
        <div className='menu__icon' onClick={this.props.handleClick}>
  	      <span></span>
  	      <span></span>
  	      <span></span>
  	      <span></span>
  	    </div>
        {this.props.children}
    </div>
    )
  }
}

Menu.defaultProps = {
  showMenu: false,
  searchOpen: false
}

Menu.propTypes = {
  showMenu: PropTypes.bool,
  searchOpen: PropTypes.bool,
  handleClick: PropTypes.func.isRequired
}

export default Menu