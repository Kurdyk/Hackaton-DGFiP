export type LocalitySelectorProps = {
    type: LocalityType,
    visible: boolean,
    id? : string
    value? : string,
};

export enum LocalityType {
    REGION,
    DEPARTEMENT,
    COMMUNE,
};