import { Box, Button } from '@mui/material'
import CityInformation from 'components/molecules/cityInformation'
import React from 'react'
import { SimulationProps } from './type'
import SimulationMap from 'components/molecules/simulationMap'

const SimulationPage: React.FC<SimulationProps> = ({commune1, commune2}) => {
  
    return (
        <Box id="SimulationPageWrapper">
            <Box id="SimulationWrapper">
                <CityInformation commune={commune1}/>
                <Box id="SimulationMapWrapper">
                    <SimulationMap commune1={commune1} commune2={commune2}/>
                </Box>
                <CityInformation commune={commune2}/>
            </Box>
            <Box id="ActionButtonsWrapper">
                <Button className="Button" variant="outlined" onClick={() => {}}>Tester la solution</Button>
                <Button className="Button" variant="outlined" onClick={() => {}}>Optimiser</Button>
                <Button className="Button" variant="outlined" onClick={() => {}}>Export</Button>
            </Box>
        </Box>
    )
}

export default SimulationPage;