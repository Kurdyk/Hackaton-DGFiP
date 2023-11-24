import WelcomeBoxComponent from 'components/molecules/welcomeBox';
import { Box, TextField } from '@mui/material'
import AccueilMapComponent from 'components/atoms/map';

const WelcomePage: React.FC = () => {

    return (
        <Box id="WelcomePageWrapper">
            <WelcomeBoxComponent id="WelcomeBox" />
            <Box id="AccueilMapWrapper">
                <AccueilMapComponent />
            </Box>
        </Box>
    )
}

export default WelcomePage;