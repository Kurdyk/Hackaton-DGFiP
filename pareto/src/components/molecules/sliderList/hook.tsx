import { useState } from "react";
import SliderList from ".";
import { SliderInfo, SliderListProps } from "./type";

export const useData = (sliderList : SliderInfo[]) => {

    const leviers = sliderList.map(({label, value, min, max, step}) => {
        
        const [sliderValue, setSliderValue] = useState<number>(value);

        return {
            label: label,
            value: sliderValue,
            setValue: setSliderValue,
            min: min,
            max: max,
            step: step
        }
    });

    return leviers;
}