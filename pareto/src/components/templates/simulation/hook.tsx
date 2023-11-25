import { Commune } from "shared/type";
import { useState } from "react";

export const useData = (commune1: Commune, commune2 : Commune) => {

    const [activity, setActivity] = useState<string>("");

    const [exoneration1, setExoneration1] = useState<number>(0);
    const [exoneration2, setExoneration2] = useState<number>(0);
    const [reduction1, setReduction1] = useState<number>(0);
    const [reduction2, setReduction2] = useState<number>(0);

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
    
    return {sliders1, sliders2, activity, setActivity};
}