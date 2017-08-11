import React, { PureComponent } from 'react'

/* libraries */
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { FormattedMessage } from 'react-intl'

/* resources */
import copyright from '../../assets/data/copyright.json'

/* styles */
import './Impressum.css'

class Impressum extends PureComponent {
  render () {
    const {
      showImpressum
    } = this.props

    const {
      messages
    } = this.context.intl

    return (
      <div className={classnames('Impressum', {'Impressum__show': showImpressum})}>
        <article className='Impressum-text'>
          <FormattedMessage id={'impressum'} />
          <FormattedMessage id={'impressum_sendin'} />
          <a className='Impressum-email' href={`mailto:${messages['impressum_mail']}`}>
            {messages['impressum_mail']}
          </a>
          <FormattedMessage id={'impressum_copyright'} />
          {copyright.data.map((entry, index) =>
            <span className='Impressum-copyright-entry' key={`copyright-${index}`}>
              {entry.Ort}, {entry.Objekt}: {entry.Rechtebesitzer}
            </span>
          )}
        </article>
        <div
          className='Impressum-menu menu_state_open'
          onClick={() => this.props.toggleImpressum(false)}
        >
          <div className='menu__icon'>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    )
  }
}

Impressum.contextTypes = {
  intl: PropTypes.object
};

Impressum.defaultProps = {
  showImpressum: false
}

Impressum.PropTypes = {
  toggleImpressum: PropTypes.func.isRequired,
  showImpressum: PropTypes.bool
}

export default Impressum