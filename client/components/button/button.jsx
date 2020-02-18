import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import MuiButton from '@material-ui/core/Button'
import clsx from 'clsx'

const Button = ({ children, className, ...extra }) => {
    const classes = useStyles()
    return (
        <MuiButton {...extra} variant="contained" className={clsx(classes.button, { [className]: !!className })}>
            {children}
        </MuiButton>
    )
}

export default Button

const useStyles = makeStyles(theme => ({
    button: {
        backgroundColor: theme.palette.primary.main,
        color: 'white'
    }
}))
