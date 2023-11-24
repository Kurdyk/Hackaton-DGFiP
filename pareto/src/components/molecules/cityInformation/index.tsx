import { Box, Slider, Typography } from '@mui/material'
import React from 'react'
import { Commune } from 'shared/type'
import SliderList from '../sliderList'

const CityInformation: React.FC<Commune> = ({name, code}) => {

    // TODO complete this component with the sliderList component

    return (
        <Box className="CityWrapper">
            <Box className="CityInformationWrapper">
                <Typography variant="h4" className="CityInformationName">{name}</Typography>
                <Typography variant="h6" className="CityInformationCode">{code}</Typography>
            </Box>
            <Box className="CitySliderWrapper">
                <SliderList sliders={[]} />
            </Box>
        </Box>
    )
}