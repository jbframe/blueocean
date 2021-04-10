import axios from 'axios'
import React, { useState } from 'react'

import { WidgetLoader, Widget } from 'react-cloudinary-upload-widget'
// userOrEvent = 'user' or 'event'
const UploadWidget = ({photoURL, setPhotoURL}) => {

  return (
    <>
      <WidgetLoader />
      <Widget
        resourceType={'image'}
        cloudName={'attendeaze'}
        uploadPreset={'preset1'}
        buttonText={'Upload Image'}
        id='cloudinary-upload-button'
        folder={'attendeaze'}
        onSuccess={(results) => setPhotoURL(results.info.url)}
        onFailure={(err) => console.log(err)}
        logging={false}
        />
    </>
  )
}

export default UploadWidget;