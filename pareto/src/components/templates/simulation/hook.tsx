import { Commune } from "shared/type";
import { useState } from "react";
import { MapArrowProps } from "components/atoms/mapArrow/type";

export const useData = (commune1: Commune, commune2 : Commune) => {

    const [activity, setActivity] = useState<string>("");

    const [exoneration1, setExoneration1] = useState<number>(0);
    const [exoneration2, setExoneration2] = useState<number>(0);
    const [reduction1, setReduction1] = useState<number>(0);
    const [reduction2, setReduction2] = useState<number>(0);

    const [arrows, setArrows] = useState<MapArrowProps[]>([]);

    const sliders1 = [
        {   
            label : "Exonération (en %)",
            value: exoneration1,
            setValue : setExoneration1,
            min : 0,
            max : 100,
            step : 1,
        },
        {
            label : "Réduction (en points)",
            value: reduction1,
            setValue : setReduction1,
            min : 0,
            max : 4000,
            step : 100,
        }
    ]

    const sliders2 = [
        {   
            label : "Exonération (en %)",
            value: exoneration2,
            setValue : setExoneration2,
            min : 0,
            max : 100,
            step : 1,
        },
        {
            label : "Réduction (en points)",
            value: reduction2,
            setValue : setReduction2,
            min : 0,
            max : 4000,
            step : 100,
        }
    ]

    const fetch_test = async () => {
        const url = "http://localhost:4444/solve";
        const request = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "commune1": commune1,
                "commune2": commune2,
                "activity": activity,
                "exoneration1": exoneration1,
                "exoneration2": exoneration2,
                "reduction1": reduction1,
                "reduction2": reduction2
            })
        };
        const response = await fetch(url, request);
        const data = await response.json();
        console.log(data);
        return data;
    }

    const simulateModification = async () => {
        const data = await fetch_test();
        const oneToTwo = data["moving1to2"];
        const twoToOne = data["moving2to1"];
        const arrows = [
            {
                from: [0, 0] as [number, number], // for now
                to: [0, 0]  as [number, number], // for now
                name: `${oneToTwo}`,
                color: "red",
                bend: 'up'
            },
            {
                from: [0, 0] as [number, number], // for now
                to: [0, 0] as [number, number], // for now
                name: `${twoToOne}`,
                color: "blue",
                bend: 'down'
            }
        ];
        setArrows(arrows);
    }

    
    return {sliders1, sliders2, activity, setActivity, arrows, simulateModification};
}