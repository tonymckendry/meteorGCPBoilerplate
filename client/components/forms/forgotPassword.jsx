import React, { useState } from 'react'

import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import Form from 'components/form'
import TextField from 'components/form/textField'

import { useObserver } from 'mobx-react-lite'
import { useStore } from 'state'
import { required } from 'lib/utils/formUtils'

const validationSchema = {
    email: [required],
}

const ForgotPassword = () => {
    const classes = useStyles()
    const { rootStore: { forgotPasswordStore } } = useStore()

    const [formSubmitted, setFormSubmitted] = useState(false)

    const handleSubmit = async formState => {
        try {
            await forgotPasswordStore.triggerForgotPassword(formState)
            setFormSubmitted(true)
        } catch (error) {
            console.error(error) // We should capture this error in sentry
        }
    }

    return useObserver(() => {
        return formSubmitted ? (
            <Grid item xs={12} className={classes.gridRow}>
                <Typography variant="body1">
                    Reset password link sent
                </Typography>
            </Grid>
        ) : (
            <Form onSubmit={handleSubmit}
                validationSchema={validationSchema}
                className={classes.form} >
                <Grid item xs={12} className={classes.gridRow}>
                    <Typography className={classes.heading}>
                            Forgot Username or Password?
                    </Typography>
                    <Typography variant="body1">
                            If your email is found in our system you will be sent a reset password link.
                    </Typography>
                </Grid>
                <Grid item xs={12} className={classes.gridRow}>
                    <TextField
                        name="email"
                        label="EMAIL"
                        fullWidth />
                </Grid>
                <Grid item xs={12} className={classes.gridRow}>
                    <Button type="submit" fullWidth className={classes.button}>
                        Submit
                    </Button>
                </Grid>
            </Form>
        )
    })
}

const useStyles = makeStyles(theme => ({
    contentContainer: {
        minWidth: 500,
        width: '25%',
    },
    gridRow: { marginBottom: 20 },
    box: {
        width: '100%',
        margin: '10px 0'
    },
    paper: {
        flexWrap: 'wrap',
        width: '100%',
        display: 'flex',
        maxWidth: 1080,
    },
    button: {
        backgroundColor: theme.palette.primary.main,
        color: 'white',
        fontSize: 25,
        letterSpacing: 5,
        marginTop: '1rem',
    },
    form: {
        width: '100%',
        maxWidth: 768,
    },
    heading: {
        fontSize: '1.6em',
        textAlign: 'center',
    },
    link: {
        color: theme.palette.common.white,
        fontSize: 25,
        letterSpacing: 5
    },
}))

export default ForgotPassword
