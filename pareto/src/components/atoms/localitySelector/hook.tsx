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
        fetch(file).then(response => response.text())
                    .then(fileContent => {
                        // Access the file content as a string
                        console.log(fileContent);

                        // If you want to parse the content as JSON
                        const parsedData = JSON.parse(fileContent);
                        console.log(parsedData[0].name);  // Output: Charente
                        console.log(parsedData[0].code);  // Output: 16
                    })
                    .catch(error => console.error('Error fetching file:', error));
        return [];
    }


    const find_data = () => {
        return read_json_file_to_array(find_file(localityType));
    }

    return find_data()
}
     