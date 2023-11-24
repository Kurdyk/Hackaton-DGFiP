import React from 'react'
import { Box, TextField } from '@mui/material'
import { LocalitySelectorProps } from './type';
import { useData } from './hook';
import { Autocomplete } from '@mui/material';

const LocalitySelectorComponent: React.FC<LocalitySelectorProps> = ({type, visible, id, value, setValue}) => {

    const {data, label} = useData(type);

    if (!visible) { // not displayed for now
        return null;
    }

    return (
        <Box id={id}>
            <Autocomplete 
                value={value}
                onChange={(event: any, newValue: string | null) => {
                    if (newValue === null) {
                        setValue("");
                    } else {
                        setValue(newValue);
                    }
                }}
                id={`localitySelector${type}`}
                options={data}
                // getOptionLabel={(option) => option.name}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label={label} />}
            />
        </Box>
  )
}

export default LocalitySelectorComponent;