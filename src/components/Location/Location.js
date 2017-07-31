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
import {isOpen, sequence} from '../../assets/utils'

/* styles */
import './Location.css'

class Location extends PureComponent {

  render () {
    console.log('[LOG]: Location renders...')

    const {
      singleLocation,
      locale,
      bookmarks,
      positionUser
    } = this.props

    const {
      image,
      slug,
      type,
      address,
      phone,
      photos,
      website,
      long,
      lat
    } = singleLocation

    const {
      messages
    } = this.context.intl

    const openingHours = [
      singleLocation.mo,
      singleLocation.di,
      singleLocation.mi,
      singleLocation.do,
      singleLocation.fr,
      singleLocation.sa,
      singleLocation.so
    ]

    const saved = bookmarks.indexOf(slug) >= 0

    let hours = []

    if (singleLocation[`open_${locale}`]) {
      hours = singleLocation[`open_${locale}`].split(', ')
    }

    return (
      <div className='Location'>
        <Helmet>
          <meta name="description" content={singleLocation[locale]} />
          <meta property="og:description" content={singleLocation[locale]} />
          <meta property="og:image" content={`${process.env.PUBLIC_URL}/images/${slug}/1.jpg`} />
        </Helmet>
      	<div className={classnames('Location-image', {'Location-image__saved': saved})}>
          {image !== null &&
            <ReactSwipe className='Location-image-swipe'>
              {sequence(parseInt(photos, 10)).map(i =>
                <img src={`${process.env.PUBLIC_URL}/images/${slug}/${i}.jpg`} alt='' key={`slide-${i}`} />
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
          <p>{singleLocation[locale]}</p>
          {type !== 'places' && 
            <div>
              <aside>{address}</aside>
              <div className='Location-is-open'>
                {isOpen(openingHours) ? messages['now.open'] : messages['now.closed']}
              </div>
              <ul className='Location-hours'>
                {hours.map(line => (
                  <li key={line.replace(/[^\w\s]/gi, '')}>{line}</li>
                ))}
              </ul>
              {phone !== null &&
                <aside>
                  {phone}
                </aside>
              }
              {website !== null && 
                <aside>
                  <a href='{website}' target='_blank'>
                    {website.replace(/(^\w+:|^)\/\//, '')}
                  </a>
                </aside>
              }
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