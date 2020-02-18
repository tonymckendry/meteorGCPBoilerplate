import Grid from '@material-ui/core/Grid'
import LinearProgress from '@material-ui/core/LinearProgress'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { Route, Switch, withRouter, } from 'react-router-dom'
import compose from 'lib/compose'
import { useStore } from 'state'
import routes from 'views/routes'

const withAppLoader = Component => {
    const AppLoader = props => {
        const { authStore: { loading } } = useStore()
        const classes = useStyles()

        return loading
            ? (
                <Grid container direction="column" justify="center" className={classes.pageContainer}>
                    <Typography variant="h3" className={classes.loadingHeader}>
                        Loading User Profile
                    </Typography>
                    <LinearProgress mode="indeterminate" className={classes.progress} />
                </Grid>
            ) : (
                <Component {...props} />
            )
    }
    return observer(AppLoader)
}

const Routes = props => {
    const { rootStore: { router } } = useStore()
    useEffect(
        () => {
            router.setRoute(props.location, props.history, props.match)
        },
        [JSON.stringify(props.location), JSON.stringify(props.history), JSON.stringify(props.match)]
    )

    return (
        <Switch>
            {Object.keys(routes)
                .map(key => {
                    const route = routes[key]
                    return <Route component={route.view} exact key={key} path={route.path} />
                })}
        </Switch>
    )
}

export default compose(withAppLoader, withRouter, observer)(Routes)

const useStyles = makeStyles(theme => ({
    pageContainer: {
        alignItems: 'center',
        backgroundColor: theme.palette.grey[800],
        height: '100vh',
        padding: '2rem',
        width: '100vw',
    },
    loadingHeader: {
        color: 'white',
        fontSize: '1.5em',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    progress: {
        width: 500,
        maxWidth: '90vw',
        marginTop: 40,
        height: 20,
        borderRadius: 4
    },
}))
