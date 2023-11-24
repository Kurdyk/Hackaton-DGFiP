export type ControlledSliderProps = {
    value: number;
    min: number;
    max: number;
    step: number;
    setValue: React.Dispatch<React.SetStateAction<number>>;
    label: string;
};