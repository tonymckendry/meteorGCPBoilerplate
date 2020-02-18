import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { observer } from 'mobx-react-lite'
import React from 'react'

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '100%',
        minHeight: `calc(100vh - ${theme.headerHeight}px)`,
    },
}))

const Thanks = () => {
    const classes = useStyles()
    return (
        <div className={classes.container}>
            <div>
                <Typography variant="h1" component="h2" gutterBottom>
                    404
                </Typography>
                <Typography variant="h4" gutterBottom>
                    Page not found.
                </Typography>
            </div>
        </div>
    )
}

export default observer(Thanks)
