import ControlledSlider from 'components/atoms/slider';
import React from 'react'
import { useData } from './hook';
import { SliderListProps } from './type';
import { Box, Typography } from '@mui/material';

const SliderList : React.FC<SliderListProps> = ({sliders}) => {

    const leviers = useData(sliders);

    return (
        <Box className="SliderList">
            {leviers.map(({label, value, setValue, min, max, step}, index) => {
                return (
                    <Box key={index}>
                        <Typography variant="h6">{label}</Typography>
                            <ControlledSlider 
                                label={label}
                                value={value}
                                setValue={setValue}
                                min={min}
                                max={max}
                                step={step}
                            />
                    </Box>
                )
            }
        )}
        </Box>
    )
}

export default SliderList;