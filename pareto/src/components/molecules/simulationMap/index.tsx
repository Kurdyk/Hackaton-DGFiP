import React from "react";
import { Commune } from "shared/type";
import { Map, GeoJson, GeoJsonFeature } from "pigeon-maps";
import { useData } from "./hook";
import { SimulationMapProps } from "./type";

const SimulationMap : React.FC<SimulationMapProps> = ({commune1, commune2}) => {

    const {geoJson1, geoJson2, center, ready} = useData(commune1, commune2);

    console.log(center, ready);

    if (!ready) return (<></>);


    // cast as GeoJsonFeature
    const geoJson1Feature = {
        type: "Feature",
        geometry : { 
            type: "Polygon",
            coordinates: geoJson1.contour.coordinates
        },
    };

    const geoJson2Feature = {
        type: "Feature",
        geometry : { 
            type: "Polygon",
            coordinates: geoJson2.contour.coordinates
        },
    };

    return (       
        <Map boxClassname="SimulationMap" height={1000} width={500} defaultCenter={[center[1], center[0]]} defaultZoom={13}>
            <GeoJson
                svgAttributes={{
                    fill: "#ccffff",
                    strokeWidth: "1",
                    opacity: "0.5",
                    stroke: "blue",
                    r: "20",
            }}>
                <GeoJsonFeature feature={geoJson1Feature} />
            </GeoJson>
            <GeoJson svgAttributes={{
                fill: "#ffcccc",
                strokeWidth: "1",
                opacity: "0.5",
                stroke: "red",
                r: "20",
                }}>
                <GeoJsonFeature feature={geoJson2Feature} />
            </GeoJson>
                
        </Map>
    )
}

export default SimulationMap;