import React from 'react'
import { ControlledSliderProps } from './type'
import { Slider } from '@mui/material'

const ControlledSlider : React.FC<ControlledSliderProps> = ({label, value, setValue, min, max, step}) => {
    return (
        <Slider 
            getAriaValueText={(value) => `${value}`}
            valueLabelDisplay="auto"
            aria-label={label}
            defaultValue={value} 
            step={step} 
            min={min}
            max={max}
            onChange={(_, newValue) => setValue(newValue as number)} 
        />
    )
}

export default ControlledSlider;