import React from 'react'
import { MapArrowProps } from './type';
import { GeoJson, GeoJsonFeature } from 'pigeon-maps';
import { useData } from './hook';

const MapArrow : React.FC<MapArrowProps> = ({id, from, to, color, bend, name}) => {


    const arrow = useData(from, to, bend, color, name)
      

    return(
        <GeoJson>
            <GeoJsonFeature feature={arrow} />
        </GeoJson>
    )
}

export default MapArrow;