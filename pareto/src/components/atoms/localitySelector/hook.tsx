import { Locality } from "shared/type";
import { LocalityType } from "./type";

export const useData = (localityType : LocalityType) => {

    const find_file = (localityType : LocalityType) => {
        switch (localityType) {
           case LocalityType.REGION:
                return "data/locality/region.csv"
            case LocalityType.DEPARTEMENT:
                return "data/locality/department.csv"
            case LocalityType.COMMUNE:
                return "data/locality/commune.csv"
        }
    }

    const read_json_file_to_array = (file : string) : Array<Locality> => {
        const fs = require('fs')
        const data = fs.readFileSync(file, 'utf8')
        const lines = data.split(/\r?\n/)
        const array = []
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].split(",")
            array.push(line)
        }
        return array
    }


    const find_data = () => {
        return read_json_file_to_array(find_file(localityType));
    }

    return find_data()
}
     