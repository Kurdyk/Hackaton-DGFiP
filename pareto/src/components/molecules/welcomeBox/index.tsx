import React, { useState } from 'react'
import { Box, TextField, Typography } from '@mui/material'
import LocalitySelector from 'components/atoms/localitySelector';
import { LocalityType } from 'components/atoms/localitySelector/type';
import HiddableButton from 'components/atoms/HiddableButton';
import { useNavigate } from 'react-router-dom';
import { WelcomeBoxProps } from './type';

const WelcomeBoxComponent: React.FC<WelcomeBoxProps> = ({id, className}) => {

    const navigate = useNavigate();

    const [region, setRegion] = useState<string>("");
    const [departement, setDepartement] = useState<string>("");
    const [commune1, setCommune1] = useState<string>("");
    const [commune2, setCommune2] = useState<string>("");

    return (
        <Box id={id} className={className} >

            <Typography id="WelcomeMessage"> Bienvenue dans notre application d'aide à la décision sur les modifications de la CFE </Typography>
            
            <Box id="SelectorWrapper">

                <LocalitySelector id="regionSelector" type={LocalityType.REGION} 
                    visible={true} value={region} setValue={setRegion} />
                <LocalitySelector id="departementSelector" type={LocalityType.DEPARTEMENT} 
                    visible={region.length > 0} value={departement} setValue={setDepartement}/>

                <Box id="communesSelectorWrapper">
                    <LocalitySelector id="commune1Selector" type={LocalityType.COMMUNE} 
                        visible={departement.length > 0} value={commune1} setValue={setCommune1}/>
                    <LocalitySelector id="commune2Selector" type={LocalityType.COMMUNE} 
                        visible={departement.length > 0} value={commune2} setValue={setCommune2}/>
                </Box>
                
                
                <HiddableButton id="startSimulationButton" isHidden={commune1.length === 0 || commune2.length === 0 || commune1 === commune2} 
                    onClick={() => {navigate("/simulation")}} text={"Lancer la simulation"}  />
            </Box>
        </Box>
  )
}

export default WelcomeBoxComponent;