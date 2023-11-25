import { Box, Slider, Typography } from '@mui/material'
import React from 'react'
import { Commune } from 'shared/type'
import SliderList from '../sliderList'
import { CityInformationProps } from './type'

const CityInformation: React.FC<CityInformationProps> = ({commune, id, sliders}) => {

    return (
        <Box className="CityWrapper" id={id}>
            <Box className="CityInformationWrapper">
                <Typography variant="h4" className="CityInformationName">{commune.name}</Typography>
                <Typography variant="h6" className="CityInformationCode">{commune.code}</Typography>
            </Box>
            <Box className="CitySliderWrapper">
                <SliderList sliders={sliders} />
            </Box>
        </Box>
    )
}

export default CityInformation;