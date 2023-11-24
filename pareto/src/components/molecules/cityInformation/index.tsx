import { Box, Slider, Typography } from '@mui/material'
import React from 'react'
import { Commune } from 'shared/type'
import SliderList from '../sliderList'
import { CityInformationProps } from './type'

const CityInformation: React.FC<CityInformationProps> = ({commune}) => {

    // TODO complete this component with the sliderList component

    return (
        <Box className="CityWrapper">
            <Box className="CityInformationWrapper">
                <Typography variant="h4" className="CityInformationName">{commune.name}</Typography>
                <Typography variant="h6" className="CityInformationCode">{commune.code}</Typography>
            </Box>
            <Box className="CitySliderWrapper">
                <SliderList sliders={[]} />
            </Box>
        </Box>
    )
}

export default CityInformation;