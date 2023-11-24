import React from 'react'
import { MapContainer, TileLayer, MapContainerProps, useMap } from 'react-leaflet'

const AccueilMapComponent: React.FC = () => {


    const position = [51.505, -0.09]
  
    return (
        <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{height: 400, width: 400}}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        </MapContainer>
    )
}

export default AccueilMapComponent;