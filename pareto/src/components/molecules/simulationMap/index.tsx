import React from "react";
import { Commune } from "shared/type";
import { Map, GeoJson, GeoJsonFeature } from "pigeon-maps";
import { useData } from "./hook";
import { SimulationMapProps } from "./type";
import MapArrow from "components/atoms/mapArrow";
import { MapArrowProps } from "components/atoms/mapArrow/type";

const SimulationMap : React.FC<SimulationMapProps> = ({commune1, commune2, id, arrows}) => {

    const {geoJson1, geoJson2, center, ready, diplayableArrows} = useData(commune1, commune2, arrows!);


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
        <Map boxClassname="SimulationMap" defaultCenter={[center[1], center[0]]} defaultZoom={13} mouseEvents={false} touchEvents={false}>
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
            {
                diplayableArrows.map((arrow : MapArrowProps) => {
                    return (
                        <MapArrow key={arrow.id} id={arrow.id} from={arrow.from} to={arrow.to} color={arrow.color} bend={arrow.bend} name={arrow.name}/>
                    )
                }
            )}
                
        </Map>
    )
}

export default SimulationMap;