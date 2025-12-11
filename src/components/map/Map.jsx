import React from 'react'
import GoogleMapReact from 'google-map-react'
import { Paper, Typography, useReactQuery } from '@material-ui/core';
import LocationOutLinedicon from '@material-ui/icons/locationOutlined';


const Map = () => {
  const isMobile = useMediaQuery('(min-width:600px');
  return (
    <div>
      <GoogleMapReact 
      bootstrapURLKeys={{key: ''}}
      defaultCenter={coordinates}
      center={coordinates}
      defaulZoom={14}
      margin={[50,50,50,50]}
      option={''}
      onChange={''}
      onChildClick={''}
      >
      
      </GoogleMapReact>
    </div>
  )
}
export default Map
