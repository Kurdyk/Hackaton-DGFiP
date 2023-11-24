import React from 'react'
import { Map, Marker } from "pigeon-maps"

const AccueilMapComponent: React.FC = () => {
  
    return (
    <Map boxClassname="WelcomeMap" 
        defaultCenter={[47.38333, 0.68333]} 
        defaultZoom={6}
        mouseEvents={false}
        touchEvents={false}/>
    )
}

export default AccueilMapComponent;