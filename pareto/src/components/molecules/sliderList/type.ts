import { ControlledSliderProps } from "components/atoms/slider/type";

export type SliderListProps = { 
    sliders : SliderInfo[],
}

export type SliderInfo = {
    value: number, // current value of the city
    setValue : React.Dispatch<React.SetStateAction<number>>, // function to set the value of the city
    label : string,
    min : number,
    max : number,
    step : number,
}