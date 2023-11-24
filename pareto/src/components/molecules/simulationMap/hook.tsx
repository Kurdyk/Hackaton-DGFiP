import { Commune } from "shared/type";

export const useData = (commune1 : Commune, commune2 : Commune) => {

    const fetchGeoJson = async (code : string) => {
        const response = await fetch(`https://geo.api.gouv.fr/communes/${code}?fields=contour`);
        const data = await response.json();
        return data;
    }

    const geoJson1 = fetchGeoJson(commune1.code);
    const geoJson2 = fetchGeoJson(commune2.code);

    const find_middle = (geoJson1 : any, geoJson2 : any) => {
        const x1 = geoJson1.coordinates[0][0][0];
        const y1 = geoJson1.coordinates[0][0][1];
        const x2 = geoJson2.coordinates[0][0][0];
        const y2 = geoJson2.coordinates[0][0][1];
        const x = (x1 + x2) / 2;
        const y = (y1 + y2) / 2;
        return [x, y] as [number, number];
    }

    const center = find_middle(geoJson1, geoJson2);

    return {geoJson1, geoJson2, center};
}