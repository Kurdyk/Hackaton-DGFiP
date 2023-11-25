import React from 'react'
import { ActivitySelectorProps } from './type'
import { Autocomplete } from '@mui/material';
import { ACTIVITY_LIST_MAP } from './const';

const ActivitySelector : React.FC<ActivitySelectorProps> = ({activity, setActivity}) => {

    return (
        <Autocomplete 
            disablePortal
            id="combo-box-demo"
            renderInput={(params) => <div ref={params.InputProps.ref}><input type="text" {...params.inputProps} /></div>}
            renderOption={(props, option) => <li {...props}>{option.label}</li>}
            options={Object.entries(ACTIVITY_LIST_MAP).map(([key, value]) => ({ key, label: `${key} : ${value}` }))}
            onChange={(_, newValue) => setActivity(newValue?.key as string)}
        />
    )
}

export default ActivitySelector;