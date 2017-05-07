import React, { PureComponent } from 'react'

/* libraries */
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Link } from 'react-router-dom'

/* resources */
import mapIcon from '../../assets/icons/map.svg'

/* styles */
import './List.css'

class List extends PureComponent {

  constructor (props) {
    super(props)
    this.state = {
      touched: -1
    }
    this.handleTouchStart = this.handleTouchStart.bind(this)
    this.handleTouchEnd = this.handleTouchEnd.bind(this)
  }

  handleTouchStart (index) {
    console.log('[LOG]: List touched...')
    // this.setState({touched: index})
  }

  handleTouchEnd () {
    console.log('[LOG]: List touch ended...')
    // this.setState({touched: -1})
  }

  render () {
    console.log('[LOG]: List renders...')

    return (
      <div className='List'>
        {this.props.locations.map((location, index) => (
          <Link to={`/location/${location.slug}`} key={`link-${index}`}>
            <section 
              className={classnames('List-location', {'List-location--touch': index === this.state.touched})}
              onTouchStart={() => this.handleTouchStart(index)}
              onTouchEnd={this.handleTouchEnd}
              style={{backgroundImage: process.env.PUBLIC_URL + 'url(/images/' + location.image + ')'}}>
              <div className='List-location-overlay'>
                <h3>{location.name}</h3>
              </div>
            </section>
          </Link>
        ))}
        <nav className='nav-view'>
          <img src={mapIcon} alt='' />
          <Link to={`/map/${this.props.match.params.filter}`}>
            {this.context.intl.messages['view.map']}
          </Link>
        </nav>
      </div>
    )
  }
}

List.contextTypes = {
  intl: PropTypes.object
};

List.propTypes = {
  locations: PropTypes.array.isRequired
}

export default List