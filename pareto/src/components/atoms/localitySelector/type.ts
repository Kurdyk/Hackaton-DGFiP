export type LocalitySelectorProps = {
    type: LocalityType,
    visible: boolean,
    id? : string
    value : string,
    setValue : React.Dispatch<React.SetStateAction<string>>;
};

export enum LocalityType {
    REGION,
    DEPARTEMENT,
    COMMUNE,
};