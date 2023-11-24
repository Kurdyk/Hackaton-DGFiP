import { useState } from "react";
import SliderList from ".";
import { SliderInfo, SliderListProps } from "./type";

export const useData = (sliderList : SliderInfo[]) => {


    

    const leviers = sliderList.map(({label, value, setValue, min, max, step}, index) => {
        
        return {
            label: label,
            value: value,
            setValue: setValue,
            min: min,
            max: max,
            step: step
        }
    });

    return leviers;
}