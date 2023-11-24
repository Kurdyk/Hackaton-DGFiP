import React from 'react'
import { Box, TextField } from '@mui/material'
import { LocalitySelectorProps } from './type';
import { useData } from './hook';
import { Autocomplete } from '@mui/material';

const localitySelectorComponent: React.FC<LocalitySelectorProps> = ({type, visible, id, value}) => {

    const data = useData(type);

    if (!visible) { // not displayed for now
        return null;
    }

    return (
        <Box id={id}>
            <Autocomplete 
                id={`localitySelector${type}`}
                options={data}
                getOptionLabel={(option) => option.name}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Localité" 
                value={value}
                />}
            />
        </Box>
  )
}

export default localitySelectorComponent;