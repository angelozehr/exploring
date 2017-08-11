import React, { PureComponent } from 'react'

/* libraries */
import PropTypes from 'prop-types'
import classnames from 'classnames'
import ReactSwipe from 'react-swipe'
import Helmet from 'react-helmet'

/* components */
import LocationMap from '../LocationMap/LocationMap'
import Bookmark from '../Bookmark/Bookmark'

/* resources */
import {sequence, getBaseUrl, consolelog} from '../../assets/utils'
import bratwurstIcon from '../../assets/icons/bratwurst.gif'

/* styles */
import './Location.css'

class Location extends PureComponent {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (event) {
    if (event.screenX > window.innerWidth / 2) {
      this.reactSwipe.next()
    } else {
      this.reactSwipe.prev()
    }
  }

  componentDidMount () {
    window.scrollTo(0, 0)
  }

  render () {
    consolelog('[LOG]: Location renders...')

    const {
      singleLocation,
      locale,
      bookmarks,
      positionUser
    } = this.props

    const {
      image,
      slug,
      address,
      phone,
      photos,
      website,
      long,
      lat,
      price
    } = singleLocation

    const {
      messages
    } = this.context.intl

    /* const openingHours = [
      singleLocation.mo,
      singleLocation.di,
      singleLocation.mi,
      singleLocation.do,
      singleLocation.fr,
      singleLocation.sa,
      singleLocation.so
    ] */

    const saved = bookmarks.indexOf(slug) >= 0

    let hours = []

    if (singleLocation[`open_${locale}`]) {
      hours = singleLocation[`open_${locale}`].split(', ')
    }

    return (
      <div className='Location'>
        <Helmet>
          <meta name="description" content={singleLocation[`description_${locale}`]} />
        </Helmet>
      	<div
          className={classnames('Location-image', {'Location-image__saved': saved})}
          onClick={this.handleClick}
        >
          {image !== null &&
            <ReactSwipe
              className='Location-image-swipe'
              swipeOptions={{continuous: true, draggable: true}}
              ref={ref => {this.reactSwipe = ref}}
            >
              {sequence(parseInt(photos, 10)).map(i =>
                <img
                  src={`${process.env.PUBLIC_URL}/images/${slug}/${i}_${slug}.jpg`}
                  srcSet={`${process.env.PUBLIC_URL}/images/${slug}/${i}_${slug}.jpg 750w,
                           ${process.env.PUBLIC_URL}/images/${slug}/${i}_${slug}@2x.jpg 1500w`}
                  alt=''
                  key={`slide-${i}`}
                />
              )}
            </ReactSwipe>
          }
        </div>
        <Bookmark
          slug={slug}
          handleClick={() => this.props.handleBookmarkClick(slug)}
          saved={saved}
        />
        <article className='Location-description'>
          <p>{singleLocation[`description_${locale}`]}</p>
            {hours.length > 0 && 
              <div>
                <aside>{address}</aside>
                <ul className='Location-hours'>
                  {hours.map(line => (
                    <li key={line.replace(/[^\w\s]/gi, '')}>{line}</li>
                  ))}
                </ul>
              </div>
            }
            {phone !== null &&
              <aside>
                {phone}
              </aside>
            }
            {website !== null && 
              <aside>
                <a href={website} target='_blank'>
                  {getBaseUrl(website)}
                </a>
              </aside>
            }
            {price !== null &&
              <div className='Location-price'>
                {messages['price']}:&nbsp;
                {sequence(parseInt(price, 10)).map(i =>
                  <img
                    className='Location-price-icon'
                    src={bratwurstIcon}
                    alt='$'
                    key={`icon-${i}`}
                  />
                )}
              </div>
            }
        </article>
        <div className='Location-Map'>
          <LocationMap
            locations={[singleLocation]}
            center={[long, lat]} 
            positionUser={positionUser}
          />
        </div>
      </div>
    )
  }
}

Location.contextTypes = {
  router: PropTypes.object,
  intl: PropTypes.object
}

Location.propTypes = {
  locale: PropTypes.string.isRequired,
  singleLocation: PropTypes.object.isRequired,
  handleBookmarkClick: PropTypes.func.isRequired,
  bookmarks: PropTypes.array,
  positionUser: PropTypes.func.isRequired
}

export default Location