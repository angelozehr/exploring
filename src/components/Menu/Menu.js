import React, { PureComponent } from 'react'

/* libraries */
import PropTypes from 'prop-types'
import classnames from 'classnames'

/* components */
import Navigation from '../Navigation/Navigation'

/* styles */
import './Menu.css'

class Menu extends PureComponent {

  constructor () {
    super()
    this.state = {
      showMenu: false
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    this.setState({
      showMenu: !this.state.showMenu
    })
  }

  render() {
    console.log('[LOG]: Menu renders...')

    return (
      <div className={classnames('Menu', {'menu_state_open': this.state.showMenu})} onClick={this.handleClick}>
        <div className='menu__icon'>
  	      <span></span>
  	      <span></span>
  	      <span></span>
  	      <span></span>
  	    </div>
        <Navigation show={this.state.showMenu} options={this.props.options} />
    </div>
    )
  }
}

Menu.propTypes = {
  options: PropTypes.array.isRequired
}

export default Menu