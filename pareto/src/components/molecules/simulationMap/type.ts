import { Commune } from "shared/type";

export type SimulationMapProps = {
    commune1 : Commune,
    commune2 : Commune,
    id? : string,
}

export type GeoJsonFeature = {
    type: string,
    geometry: { type: string, coordinates: [number, number] },
  };