import React, { PureComponent } from 'react'

/* libraries */
import PropTypes from 'prop-types'
import classnames from 'classnames'

/* resources */
import de from '../../assets/icons/wohin.svg'
import en from '../../assets/icons/exploring.svg'
import ch from '../../assets/icons/wohi.svg'

/* styles */
import './Start.css'

class Start extends PureComponent {

  constructor (props) {
    super(props)
    this.icons = {de: de, en: en, ch: ch}
  }

  render () {
    const {
      locale,
      messages
    } = this.context.intl

    return (
      <div className={classnames('Start', { 'Start__hidden': this.props.hidden })}>
        <span>
          <img
            className='Start-logo'
            src={`${this.icons[locale]}`}
            alt={messages['AppName']} 
          />
        </span>
      </div>
    )
  }
}

Start.contextTypes = {
  intl: PropTypes.object
}

Start.defaultProps = {
  hidden: false
}

Start.propTypes = {
  hidden: PropTypes.bool
}

export default Start