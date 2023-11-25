import React from 'react'
import { ControlledSliderProps } from './type'
import { Slider } from '@mui/material'

const ControlledSlider : React.FC<ControlledSliderProps> = ({label, value, setValue, min, max, step}) => {
    return (
        <Slider 
            getAriaValueText={(value) => `${value}`}
            valueLabelDisplay="auto"
            aria-label={label}
            value={value} 
            step={step} 
            min={min}
            max={max}
            onChangeCommitted={(_, newValue) => {setValue(newValue as number); console.log(value)}} 
        />
    )
}

export default ControlledSlider;