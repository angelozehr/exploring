import React, { PureComponent } from 'react'

/* libraries */
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateIntl } from 'react-intl-redux'

/* components */
import App from './App'

/* resouces */
import {consolelog} from '../assets/utils'

/* actions */
import * as actions from '../actions'

class AppContainer extends PureComponent {

  componentDidMount() {
    document.body.classList.remove('loading')
  }

  render () {
    consolelog('[LOG]: AppContainer renders...')

    return (
      <Router>
        <Route path="/:view?/:filter?" render={matchProps => <App {...this.props} {...matchProps} />} />
      </Router>
    )
  }
}

AppContainer.PropTypes = {
  locationsLoading: PropTypes.bool.isRequired,
  locationsError: PropTypes.instanceOf(Error),
  locations: PropTypes.arrayOf(PropTypes.object).isRequired,
  view: PropTypes.string.isRequired,
  category: PropTypes.string,
  showMenu: PropTypes.bool,
  bookmarks: PropTypes.arrayOf(PropTypes.string),
  searchOpen: PropTypes.bool,
  query: PropTypes.string,
  singleLocation: PropTypes.object
}

const mapStateToProps = state => {
  return {
    locationsLoading: state.locations.locationsLoading,
    locationsError: state.locations.locationsError,
    locations: state.locations.locations,
    view: state.app.view,
    category: state.app.category,
    showMenu: state.app.showMenu,
    bookmarks: state.bookmarks.bookmarks,
    query: state.app.query,
    searchOpen: state.app.searchOpen,
    showResults: state.app.showResults,
    showImpressum: state.app.showImpressum,
    singleLocation: state.app.singleLocation,
    locale: state.intl.locale,
    messages: state.intl.messages,
    userPosition: state.app.userPosition
  }
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({...actions, updateIntl}, dispatch)
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer)