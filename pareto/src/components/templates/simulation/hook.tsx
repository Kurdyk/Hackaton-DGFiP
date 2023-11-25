import { Commune } from "shared/type";
import { useState } from "react";

export const useData = (commune1: Commune, commune2 : Commune) => {

    const [activity, setActivity] = useState<string>("");

    const [exoneration1, setExoneration1] = useState<number>(0);
    const [exoneration2, setExoneration2] = useState<number>(0);
    const [reduction1, setReduction1] = useState<number>(0);
    const [reduction2, setReduction2] = useState<number>(0);
    const [loser, setLoser] = useState<number>();
    const [done, setDone] = useState<boolean>(false);
    const [result, setResult] = useState<string>("");

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

        if (!commune1 || !commune2 || !activity) return;

        console.log(commune1, commune2, activity, exoneration1, exoneration2, reduction1, reduction2)

        const url = "http://localhost:4444/solve";
        const request = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "commune1": commune1,
                "commune2": commune2,
                "activity": activity,
                "exoneration1": exoneration1 / 100.0,
                "exoneration2": exoneration2 / 100.0,
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
        if (!data) return;
        const oneToTwo = data["moving1to2"];
        const twoToOne = data["moving2to1"];
        const n1 = data["finalNb1"];
        const n2 = data["finalNb2"];
        
        if (oneToTwo === 0 && twoToOne === 0) {
            setLoser(undefined);
            setResult(`Aucun mouvement d'entreprises. Nombres d'entreprises finales : ${n1} pour ${commune1.name} et ${n2} pour ${commune2.name}`);
        } else if (oneToTwo > twoToOne) {
            setLoser(1);
            setResult(`${commune1.name} perd ${oneToTwo} entreprises au profit de ${commune2.name}. 
            Nombres d'entreprises finales : ${n1} pour ${commune1} et ${n2} pour ${commune2}`);
        } else {
            setResult(`${commune2.name} perd ${twoToOne} entreprises au profit de ${commune1.name}.
            Nombres d'entreprises finales : ${n1} pour ${commune1} et ${n2} et pour ${commune2}`);
            setLoser(2);
        }

        setDone(true);

    }

    const downloadJsonFile = () => {
        // Your JSON data
        const jsonData = {
            commune1: commune1,
            commune2: commune2,
            activity: activity,
            exoneration1: exoneration1 / 100.0,
            exoneration2: exoneration2 / 100.0,
            reduction1: reduction1,
            reduction2: reduction2,
            result: result
        };
      
            // Convert JSON data to a Blob
            const jsonBlob = new Blob([JSON.stringify(jsonData)], { type: 'application/json' });
        
            // Create a download link
            const a = document.createElement('a');
            a.href = URL.createObjectURL(jsonBlob);
            a.download = 'export.json';
        
            // Append the link to the body, trigger the click event, and remove the link
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        };
      

    
    return {sliders1, sliders2, activity, setActivity, loser, simulateModification, done, result, downloadJsonFile};
}