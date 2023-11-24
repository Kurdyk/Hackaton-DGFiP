import React from 'react'
import { Box, Button, TextField } from '@mui/material'
import { HiddableButtonProps } from './type';

const HiddableButton: React.FC<HiddableButtonProps> = ({onClick, isHidden, id, text}) => {

    if (isHidden) {
        return null;
    }

    return (
        <Box id={id}>
            <Button onClick={onClick}>{text}</Button>
        </Box>
    )
}

export default HiddableButton;