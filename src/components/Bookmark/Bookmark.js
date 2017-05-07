import React, { PureComponent } from 'react'

/* libraries */
import PropTypes from 'prop-types'

/* resources */
import bookmarkIcon from '../../assets/icons/bookmark.svg'
import bookmarkedIcon from '../../assets/icons/bookmarked.svg'

import './Bookmark.css'

class Bookmark extends PureComponent {

  constructor(props) {
    super(props);
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || []
    this.state = {
      bookmarks: bookmarks,
      saved: bookmarks.indexOf(this.props.locationId) >= 0
    }
    this.handleClick = this.handleClick.bind(this)
  }
 
  handleClick(locationId) {
    let { bookmarks } = this.state
    if( !this.state.saved ) {
      bookmarks.push(locationId)
    } else {
      bookmarks = bookmarks.filter(bookmark => bookmark !== locationId)
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
    this.setState({
      bookmarks: bookmarks,
      saved: !this.state.saved
    })
  }

  render () {
    return (
      <div className='Bookmark'>
        <img src={this.state.saved ? bookmarkedIcon : bookmarkIcon } onClick={() => {this.handleClick(this.props.locationId)}} />
      </div>
    )
  }
}

Bookmark.propTypes = {
  locationId: PropTypes.number.isRequired
}

export default Bookmark