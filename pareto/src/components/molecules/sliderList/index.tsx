import ControlledSlider from 'components/atoms/slider';
import React from 'react'
import { useData } from './hook';
import { SliderListProps } from './type';
import { Box } from '@mui/material';

const SliderList : React.FC<SliderListProps> = ({sliders}) => {

    const leviers = useData(sliders);

    return (
        <Box>
            {leviers.map(({label, value, setValue, min, max, step}) => {
                return (
                    <ControlledSlider 
                        label={label}
                        value={value}
                        setValue={setValue}
                        min={min}
                        max={max}
                        step={step}
                    />
                )
            }
        )};
        </Box>
    )
}

export default SliderList;