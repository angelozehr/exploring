import React, { PureComponent } from 'react'

/* libraries */
import { BrowserRouter as Router, Route } from 'react-router-dom'

/* components */
import App from './App'

class AppContainer extends PureComponent {

  render () {
    console.log('[LOG]: AppContainer renders...')

    return (
		  <Router>        
        <Route path="/:view?/:filter?" render={matchProps => <App {...this.props} {...matchProps} />} />
      </Router>
    )
  }
}

export default AppContainer