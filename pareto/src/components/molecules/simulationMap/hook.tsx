import React from "react";
import { Commune } from "shared/type";

export const  useData = (commune1 : Commune, commune2 : Commune) => {

    const [geoJson1, setGeoJson1] = React.useState<any>();
    const [geoJson2, setGeoJson2] = React.useState<any>();
    const [ready, setReady] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (geoJson1 && geoJson2) {
            setReady(true);
        }
    }, [geoJson1, geoJson2]);

    const fetchGeoJson = async (code : string, setter : React.Dispatch<any>) => {
        const response = await fetch(`https://geo.api.gouv.fr/communes/${code}?fields=centre,contour`);
        const data = await response.json();
        setter.call(undefined, data);
    }

    React.useEffect(() => {
        fetchGeoJson(commune1.code, setGeoJson1);
        fetchGeoJson(commune2.code, setGeoJson2);
    }, [commune1, commune2]);

    const find_middle = (geoJson1 : any, geoJson2 : any) => {

        if (!ready) return [0, 0] as [number, number];

        const center1 = geoJson1.centre.coordinates;
        const center2 = geoJson2.centre.coordinates;

        const x = (center1[0] + center2[0]) / 2;
        const y = (center1[1] + center2[1]) / 2;
        return [x, y] as [number, number];
    }

    const center = find_middle(geoJson1, geoJson2);

    return {geoJson1, geoJson2, center, ready};
}