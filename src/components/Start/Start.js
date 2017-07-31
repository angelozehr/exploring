import React, { PureComponent } from 'react'

/* libraries */
import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'
import classnames from 'classnames'

/* styles */
import './Start.css'

class Start extends PureComponent {

  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div className={classnames('Start', { 'Start__hidden': this.props.hidden })}>
        <FormattedMessage id={'AppName'} />
      </div>
    )
  }
}

Start.defaultProps = {
  hidden: false
}

Start.propTypes = {
  hidden: PropTypes.bool
}

export default Start