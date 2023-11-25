export const useData = (from : [number, number], to : [number, number], bend : string, color : string, name : string) => {

    let middle_point;
    if (bend === "up") {
        middle_point = [(from[0] + to[0])/2, (from[1] + to[1])/2 + 0.1];
    } else { // down
        middle_point = [(from[0] + to[0])/2, (from[1] + to[1])/2 - 0.1];
    }

    const arrow = {
        "type": "Feature",
        "geometry": {
          "type": "MultiLineString",
          "coordinates": [
            from,
            middle_point,
            to
          ]
        },
        "properties": {
          "stroke": color,  
          "stroke-width": 2, 
          "arrow": "true",
          "name": "My Arrow Label"
        }
    }

    return arrow;
}