import { Box } from '@mui/material'
import CityInformation from 'components/molecules/cityInformation'
import React from 'react'
import { SimulationProps } from './type'
import SimulationMap from 'components/molecules/simulationMap'

const SimulationPage: React.FC<SimulationProps> = ({commune1, commune2}) => {
  
    return (
        <Box className="SimulationWrapper">
            <CityInformation commune={commune1}/>
            <SimulationMap commune1={commune1} commune2={commune2}/>
            <CityInformation commune={commune2}/>
        </Box>
    )
}

export default SimulationPage;