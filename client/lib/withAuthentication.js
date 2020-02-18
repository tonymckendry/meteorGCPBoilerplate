import { observer } from 'mobx-react-lite'
import React from 'react'
import { Redirect } from 'react-router-dom'
import ErrorBoundary from 'components/error/error'
import { useStore } from 'state'

const withAuthentication = Component => {
    const ProtectedComponent = props => {
        const { authStore: { currentUser } } = useStore()
        if (!currentUser || currentUser.deactivated) {
            return <Redirect to="/login" />
        }
        return (
            <div>
                <ErrorBoundary type="nonAdmin">
                    <div>
                        <Component {...props} />
                    </div>
                </ErrorBoundary>
            </div>
        )
    }
    return observer(ProtectedComponent)
}

export default withAuthentication
