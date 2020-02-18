import React, { memo } from 'react'

import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'

const AddOption = memo(({ inputValue, onButtonClick, onInputChange, onInputKeyPress }) => {
    return (
        <Paper style={{ margin: 16, padding: 16 }}>
            <Grid container>
                <Grid xs={8} md={9} item style={{ paddingRight: 16 }}>
                    <TextField
                        placeholder="Add Option"
                        name="addOption"
                        value={inputValue}
                        onChange={onInputChange}
                        onKeyPress={onInputKeyPress}
                        fullWidth />
                </Grid>
                <Grid xs={4} md={3} item>
                    <Button
                        fullWidth
                        color="primary"
                        variant="outlined"
                        onClick={onButtonClick}>
                        Add
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    )
})

export default AddOption
