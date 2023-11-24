import React, { useState } from 'react'
import { Box, TextField } from '@mui/material'
import LocalitySelector from 'components/atoms/localitySelector';
import { LocalityType } from 'components/atoms/localitySelector/type';

const WelcomeBoxComponent: React.FC = () => {

    const [region, setRegion] = useState<string>("");
    const [departement, setDepartement] = useState<string>("");
    const [commune, setCommune] = useState<string>("");

    return (
        <Box id={`welcomeBox`}>
            <TextField id="standard-basic" label="Standard"> Bienvenue dans notre application d'aide à la décision sur les modifications de la CFE </TextField>
            <LocalitySelector id="regionSelector" type={LocalityType.REGION} visible={true} value={region}/>
            <LocalitySelector id="departementSelector" type={LocalityType.DEPARTEMENT} visible={region.length > 0} value={departement}/>
            <LocalitySelector id="communeSelector" type={LocalityType.COMMUNE} visible={departement.length > 0} value={commune}/>
        </Box>
  )
}

export default WelcomeBoxComponent;