import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Box } from '@mui/material'
import WelcomePage from 'components/templates/welcomePage';

const AllRoutes: React.FC = () => {

    return (
        <Box id="routeBox">
            <Routes>
               <Route path="/" element={<WelcomePage />} />
               <Route path="/simulation" element={<WelcomePage />} />
            </Routes>
        </Box>
    )
}

export default AllRoutes;