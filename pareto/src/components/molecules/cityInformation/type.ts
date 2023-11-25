import { Commune } from "shared/type";
import { SliderInfo } from "../sliderList/type";

export type CityInformationProps = {
    commune : Commune,
    sliders : SliderInfo[],
    id? : string,
}