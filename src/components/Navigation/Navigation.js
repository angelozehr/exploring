import React, { PureComponent } from 'react'

/* libraries */
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'
import { debounce } from 'throttle-debounce';

/* resources */
import searchIcon from '../../assets/icons/search.svg'
import ch from '../../assets/locales/ch.json'
import de from '../../assets/locales/de.json'
import en from '../../assets/locales/en.json'

/* styles */
import './Navigation.css'

class Navigation extends PureComponent {

  render() {
    let {
      view,
      query
    } = this.props

    let {
      messages
    } = this.context.intl

    const placeholder = query !== ''
    ? query
    : messages['search']

    if (view === 'location') view = 'list'
    
    return (
      <nav className={classnames('Navigation', {show: this.props.show, search: this.props.searchOpen, results: this.props.showRestults})}>
        <ul>
          {this.props.options.map( (entry, index) => (
            <Link
              to={`/${view}/${entry}`}
              key={`nav-${index}`}
              className={classnames('Navigation-link', {'show': !this.props.searchOpen})}
              onClick={() => this.props.handleClick(entry)}>
              <li>
                <FormattedMessage id={`category.${entry}`} />
              </li>
            </Link>
          ))}
          <a className='Navigation-link show search-link' onClick={this.props.handleSearchIconClick}>
            <li>
              <img src={searchIcon} alt='Search' />
              <input
                autoFocus
                className={classnames({'show': this.props.searchOpen})}
                ref={input => this.input = input}
                name='search'
                placeholder={placeholder}
                type='text'
                onKeyUp={debounce(1000, () => this.props.search(this.input.value))} />
            </li>
          </a>
        </ul>
        <small className='Navigation-small Navigation-small__top Navigation-small__left'>
          {messages['AppName.short']}
        </small>
        <small className='Navigation-small Navigation-small__bottom Navigation-small__right'>
          {messages['Impressum']}
        </small>
        <small className='Navigation-small Navigation-small__bottom Navigation-small__left'>
          <button
            className='Navigation-langSwitch-button'
            onClick={() => this.props.handleLangSwitchClick({locale: 'de', messages: de})}
          >
            DE
          </button>
          <button
            className='Navigation-langSwitch-button'
            onClick={() => this.props.handleLangSwitchClick({locale: 'en', messages: en})}
          >
            EN
          </button>
          <button
            className='Navigation-langSwitch-button'
            onClick={() => this.props.handleLangSwitchClick({locale: 'ch', messages: ch})}
          >
            CH
          </button>
        </small>
      </nav>
    )
  }
}

Navigation.contextTypes = {
  router: PropTypes.object,
  intl: PropTypes.object
}

Navigation.defaultProps = {
  show: false,
  searchOpen: false,
  showRestults: false,
  query: ''
}

Navigation.propTypes = {
  view: PropTypes.string.isRequired,
  show: PropTypes.bool,
  handleSearchIconClick: PropTypes.func.isRequired,
  handleLangSwitchClick: PropTypes.func.isRequired,
  searchOpen: PropTypes.bool,
  search: PropTypes.func.isRequired,
  query: PropTypes.string,
  showRestults: PropTypes.bool,
  options: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired
}

export default Navigation