import React from "react";
import { Map, GeoJson, GeoJsonFeature } from "pigeon-maps";
import { useData } from "./hook";
import { SimulationMapProps } from "./type";

const SimulationMap : React.FC<SimulationMapProps> = ({commune1, commune2, id, loser}) => {

    const {geoJson1, geoJson2, center, ready} = useData(commune1, commune2);

    const [fill1, setFill1] = React.useState<string>("#ccffff");
    const [fill2, setFill2] = React.useState<string>("#ffcccc");

    React.useEffect(() => {
        if (!loser) return;
        if (loser === 1) {
            setFill1("red")
            setFill2("green")
        } else {
            setFill2("red")
            setFill1("green")
        }
    }, [loser]);

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
                    fill: fill1,
                    strokeWidth: "1",
                    opacity: "0.5",
                    stroke: "blue",
                    r: "20",
            }}>
                <GeoJsonFeature feature={geoJson1Feature} />
            </GeoJson>
            <GeoJson svgAttributes={{
                fill: fill2,
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