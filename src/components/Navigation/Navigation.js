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
    let view = this.context.router.route.match.params.view === 'location'
    ? 'list'
    : this.context.router.route.match.params.view
    
    return (
      <nav className={classnames('Navigation', {show: this.props.show})}>
        <ul>
          {this.props.options.map( (entry, index) => (
            <Link to={`/${view}/${entry}`} key={`nav-${index}`} className='Navigation-link'>
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

Navigation.contextTypes = {
  router: PropTypes.object
}

Navigation.defaultProps = {
  show: false
}

Navigation.propTypes = {
  show: PropTypes.bool,
  options: PropTypes.array.isRequired
}

export default Navigation