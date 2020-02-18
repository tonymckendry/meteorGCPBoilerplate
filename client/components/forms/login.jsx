import React, { useState } from 'react'
import Form from 'components/form'
import TextField from 'components/form/textField'
import Button from '@material-ui/core/Button'
import FormHelperText from '@material-ui/core/FormHelperText'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import { useObserver } from 'mobx-react-lite'
import { required } from 'lib/utils/formUtils'
import { useStore } from 'state'

const validationSchema = {
    email: [required],
    password: [required],
}

const Login = ({ onSuccess, onError }) => {
    const classes = useStyles()
    const {
        rootStore: { loginStore },
        authStore: { setLoggingIn }
    } = useStore()

    const initError = { error: false, message: '' }
    const [error, setError] = useState(initError)

    const handleLogin = formState => {
        setLoggingIn(true)
        setError(initError)
        loginStore.handleLogin(formState)
            .then(onSuccess)
            .catch(err => {
                setError({ ...err })
                onError(err)
            })
            .finally(() => {
                setLoggingIn(false)
            })
    }

    return useObserver(() => (
        <Form onSubmit={handleLogin} validationSchema={validationSchema} className={classes.fullWidth}>
            <Grid item xs={12} className={classes.gridRow}>
                <TextField
                    name="email"
                    label="EMAIL"
                    fullWidth />
            </Grid>
            <Grid item xs={12} className={classes.gridRow}>
                <TextField
                    name="password"
                    label="PASSWORD"
                    type="password"
                    fullWidth />
                {error.error && (
                    <FormHelperText error={true}>{error.reason}</FormHelperText>
                )}
            </Grid>
            <Grid item xs={12} className={classes.gridRow}>
                <Button type="submit" fullWidth className={classes.button}>
                    Sign In
                </Button>
            </Grid>
        </Form>
    ))
}

Login.defaultProps = {
    onSuccess: (user) => user,
    onError: console.error,
}

const useStyles = makeStyles(theme => ({
    button: {
        backgroundColor: theme.palette.primary.main,
        color: 'white',
        fontSize: 25,
        letterSpacing: 5,
        marginTop: '1rem',
    },
    fullWidth: { width: '100%' },
    gridRow: { marginBottom: 20 },
}))

export default Login
