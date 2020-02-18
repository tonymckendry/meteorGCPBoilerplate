import React from 'react'
import MuiAutocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'

const Autocomplete = ({ label, options }) => {
    return (
        <MuiAutocomplete
            options={options}
            renderInput={params => (
                <TextField {...params} label={label} variant="outlined" fullWidth />
            )} />
    )
}

export default Autocomplete
