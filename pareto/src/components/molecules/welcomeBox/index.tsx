import React, { useState } from 'react'
import { Box, TextField, Typography } from '@mui/material'
import LocalitySelector from 'components/atoms/localitySelector';
import { LocalityType } from 'components/atoms/localitySelector/type';
import HiddableButton from 'components/atoms/HiddableButton';
import { useNavigate } from 'react-router-dom';

const WelcomeBoxComponent: React.FC = () => {

    const navigate = useNavigate();

    const [region, setRegion] = useState<string>("");
    const [departement, setDepartement] = useState<string>("");
    const [commune, setCommune] = useState<string>("");

    return (
        <Box id={`welcomeBox`}>

            <Typography id="WelcomeMessage"> Bienvenue dans notre application d'aide à la décision sur les modifications de la CFE </Typography>

            <LocalitySelector id="regionSelector" type={LocalityType.REGION} 
                visible={true} value={region} setValue={setRegion} />
            <LocalitySelector id="departementSelector" type={LocalityType.DEPARTEMENT} 
                visible={region.length > 0} value={departement} setValue={setDepartement}/>
            <LocalitySelector id="communeSelector" type={LocalityType.COMMUNE} 
                visible={departement.length > 0} value={commune} setValue={setCommune}/>
            
            <HiddableButton id="startSimulationButton" isHidden={commune.length === 0} 
                onClick={() => {navigate("/simulation")}} text={"Lancer la simulation"} />
        </Box>
  )
}

export default WelcomeBoxComponent;