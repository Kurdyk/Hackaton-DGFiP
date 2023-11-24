export type Region = {
    name: string;
};

export type Departement = {
    name: string;
    numero : string;
};

export type Commune = {
    name: string;
    code: string;
};

export type Locality = Region | Departement | Commune;