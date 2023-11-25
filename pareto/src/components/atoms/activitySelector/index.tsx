import React from 'react'
import { ActivitySelectorProps } from './type'
import { Autocomplete } from '@mui/material';
import { ACTIVITY_LIST } from './const';

const ActivitySelector : React.FC<ActivitySelectorProps> = ({activity, setActivity}) => {

    return (
        <Autocomplete 
            disablePortal
            id="combo-box-demo"
            options={ACTIVITY_LIST}
            onChange={(_, newValue) => setActivity(newValue as string)}
            renderInput={(params) => <div ref={params.InputProps.ref}><input type="text" {...params.inputProps} /></div>}
        />
    )
}

export default ActivitySelector;