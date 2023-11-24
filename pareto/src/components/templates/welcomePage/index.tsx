import WelcomeBoxComponent from 'components/molecules/welcomeBox';
import { Box, TextField } from '@mui/material'
import AccueilMapComponent from 'components/atoms/map';

const WelcomePage: React.FC = () => {

    return (
        <Box>
            <WelcomeBoxComponent />
            <Box id="AccueilMapWrapper">
                <AccueilMapComponent />
            </Box>
        </Box>
    )
}

export default WelcomePage;