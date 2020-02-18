import React from 'react'
import { observer } from 'mobx-react-lite'
import { Redirect } from 'react-router-dom'
import { useStore } from 'state'

const Home = () => {
    const { authStore: { currentUser } } = useStore()

    if (currentUser && !currentUser.deactivated) {
        // Redirect to dashboard if logged in
        return <Redirect to="/dashboard" />
    }

    return <Redirect to="/login" />
}

export default observer(Home)
