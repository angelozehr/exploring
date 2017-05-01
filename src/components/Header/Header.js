import React, { PureComponent } from 'react'

/* libraries */
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'

/* components */
import Menu from '../Menu/Menu'

/* styles */
import './Header.css';

class Header extends PureComponent {

  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div className='Header'>
        <h1>
          {this.props.title}
        </h1>
        <Menu options={this.props.options} />
      </div>
    )
  }
}

Header.defaultProps = {
  title: 'Exploring'
}

Header.propTypes = {
  title: PropTypes.string,
  options: PropTypes.array.isRequired
}

export default Header