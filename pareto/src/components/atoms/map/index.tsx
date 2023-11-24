import React from 'react'
import { Map, Marker } from "pigeon-maps"

const AccueilMapComponent: React.FC = () => {
  
    return (
    <Map height={300} defaultCenter={[51.505, -0.09]} defaultZoom={11}>
        <Marker width={50} anchor={[51.505, -0.09]} />
    </Map>
    )
}

export default AccueilMapComponent;