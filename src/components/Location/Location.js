import React, { PureComponent } from 'react'

/* libraries */
import PropTypes from 'prop-types'
import classnames from 'classnames'
import ReactSwipe from 'react-swipe'

/* components */
import LocationMap from '../LocationMap/LocationMap'
import Bookmark from '../Bookmark/Bookmark'

/* resources */
import {isOpen} from '../../assets/utils'

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
      website,
      long,
      lat
    } = singleLocation

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
      	<div className={classnames('Location-image', {'Location-image__saved': saved})}>
          {image !== null &&
            <ReactSwipe className='Location-image-swipe'>
              {[1,2,3].map(i =>
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
              <div className={classnames('Location-is-open', {'Location-is-open__true': isOpen(openingHours)})} />
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

Location.propTypes = {
  locale: PropTypes.string.isRequired,
  singleLocation: PropTypes.object.isRequired,
  handleBookmarkClick: PropTypes.func.isRequired,
  bookmarks: PropTypes.array,
  positionUser: PropTypes.func.isRequired
}

export default Location