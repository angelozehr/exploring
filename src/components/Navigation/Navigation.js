import React, { PureComponent } from 'react'

/* libraries */
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'

/* styles */
import './Navigation.css'

class Navigation extends PureComponent {

  render() {
    return (
      <nav className={classnames('Navigation', {show: this.props.show})}>
        <ul>
          {this.props.options.map( (entry, index) => (
            <Link to={`/list/${entry}`} key={`nav-${index}`} className='Navigation-link'>
              <li>
                <FormattedMessage id={`filter.${entry}`} />
              </li>
            </Link>
          ))}
        </ul>
      </nav>
    )
  }
}

Navigation.defaultProps = {
  show: false
}

Navigation.propTypes = {
  show: PropTypes.bool,
  options: PropTypes.array.isRequired
}

export default Navigation