import React from "react";
import { Commune } from "shared/type";
import { Map, GeoJson, GeoJsonFeature } from "pigeon-maps";
import { useData } from "./hook";
import { SimulationMapProps } from "./type";

const SimulationMap : React.FC<SimulationMapProps> = ({commune1, commune2}) => {

    const {geoJson1, geoJson2, center} = useData(commune1, commune2);

    return (       
        <Map boxClassname="SimulationMap" height={300} defaultCenter={center} defaultZoom={4}>
            <GeoJson
                svgAttributes={{
                    fill: "#d4e6ec99",
                    strokeWidth: "1",
                    stroke: "white",
                    r: "20",
            }}>
                <GeoJsonFeature feature={geoJson1} />
                <GeoJsonFeature feature={geoJson2} />
            </GeoJson>
        </Map>
    )
}

export default SimulationMap;