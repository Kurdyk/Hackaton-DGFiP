import { Locality } from "shared/type";
import { LocalityType } from "./type";
import { regions, departements, communes } from "./const";

export const useData = (localityType : LocalityType) => {

    const find_data = (localityType : LocalityType): Array<Locality> => {
        switch (localityType) {
            case LocalityType.REGION:
                return JSON.parse(JSON.stringify(regions));
            case LocalityType.DEPARTEMENT:
                return JSON.parse(JSON.stringify(departements));
            case LocalityType.COMMUNE:
                return JSON.parse(JSON.stringify(communes));
        }
    }

    const cast_to_string = (data: Array<Locality>): string[] => {
        let result: string[] = [];
        data.forEach((locality: Locality) => {
            // push name and code if it exists
            result.push(locality.name); 
        });
        console.log(result)
        return result;
    }

    const label = (localityType : LocalityType): string => {
        switch (localityType) {
            case LocalityType.REGION:
                return "Région";
            case LocalityType.DEPARTEMENT:
                return "Département";
            case LocalityType.COMMUNE:
                return "Commune";
        }
    }

    return {
        data: cast_to_string(find_data(localityType)),
        label: label(localityType)
    };
}
     