import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Box } from '@mui/material'
import WelcomePage from 'components/templates/welcomePage';
import SimulationPage from 'components/templates/simulation';

const AllRoutes: React.FC = () => {

    return (
        <Box id="routeBox">
            <Routes>
               <Route path="/" element={<WelcomePage />} />
               <Route path="/simulation" element={<SimulationPage commune1={{
                    name: "L'Isle d'Espagnac",
                    code: '16166'
                }} commune2={{
                    name: 'Gond Pontouvre',
                    code: '16154'
                }} />} />
            </Routes>
        </Box>
    )
}

export default AllRoutes;