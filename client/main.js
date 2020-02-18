import isNull from 'lodash.isnull'
import autorun from 'meteor/space:tracker-mobx-autorun'
import promiseFinally from 'promise.prototype.finally'
import React from 'react'
import ReactDOM from 'react-dom'
import AuthStore from 'state/auth'
import RootStore from 'state/singletons'
import Main from 'views/main.jsx'

promiseFinally.shim()

// deployment token generated 12.9.19 by TW

/**
 * Set global application loading state when user is logging in
 */
const isLoggingIn = autorun(() => {
    // we use this to show a loading animation while things get set up
    AuthStore.setLoggingIn(Meteor.loggingIn() && !Meteor.user())
})

/**
 * Always keep an updated copy of the user in the store
 */
const ReactiveUser = autorun(() => {
    const activeUser = !isNull(Meteor.user())
    AuthStore.authenticate(activeUser)
})

if (Meteor.isClient) {
    Accounts.onLogin(() => {
        AuthStore.setUser(Meteor.user())
    })

    Accounts.onEnrollmentLink((token, done) => {
        AuthStore.setPasswordFromInvite(token)
    })

    Accounts.onLogout(() => {
        AuthStore.setUser(null)
        AuthStore.userSubscriptions === null
    })

    Accounts.onResetPasswordLink(token => {
        AuthStore.setResetToken(token)
    })

    Meteor.startup(() => {
        ReactiveUser.start()
        isLoggingIn.start()
        ReactDOM.render(<Main />, document.getElementById('render-target'))
    })
}
