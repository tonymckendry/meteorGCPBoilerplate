import isNull from 'lodash.isnull'
import { action, observable } from 'mobx'
import User from 'state/prototypes/user'
import rootStore from 'state/singletons'

class AuthStore {
    @observable loading = false
    @observable currentUser = null
    @observable userSubscriptions = []
    @observable open = false
    @observable resetToken = null
    @observable showPasswordResetOnly = false
    @observable showForgotPassword = false
    @observable inviteEmailPassword = false
    @observable token = null

    @action
    setUser = user => {
        this.currentUser = user ? new User(user._id, user) : null
        return this.currentUser
    }

    @action
    authenticate = bool =>
        new Promise(resolve => {
            if (bool) {
                this.setUser(Meteor.user())
                resolve(this.currentUser)
            } else {
                this.setUser(null)
                this.currentUser = null
                this.userSubscriptions = []
                resolve(null)
            }
        })

    @action
    authorize = () => {
        if (this.currentUser.deactivated) {
            return Promise.reject({
                error: 401,
                reason: 'Your account has been deactivated',
                message: 'Your account has been deactivated [401]',
                errorType: 'Authorization.Error'
            })
        }
        return Promise.resolve(this.currentUser)
    }

    @action
    updateUser = (key, value) => {
        const userId = this.currentUser.id
        const payload = { userId, key, value }

        Meteor.call('user.update', payload, err => {
            if (err) {
                console.error(err) // eslint-disable-line
                rootStore.notification.dispatch('Something went wrong', 'error')
            } else {
                rootStore.notification.dispatch('Profile successfully updated', 'success')
            }
        })
    }

    @action
    updateProfile = formState => {
        Meteor.call('user.profile.update', this.currentUser.id, formState.values, err => {
            rootStore.notification.dispatch('Updating user profile...', 'info')
            if (err) {
                console.error(err)
                rootStore.notification.dispatch('Update Failed', 'error')
            } else {
                rootStore.notification.dispatch('Successfully Updated', 'success')
            }
        })
    }

    @action
    setPasswordFromInvite = token => {
        this.inviteEmailPassword = true
        this.token = token
        this.showPasswordResetOnly = true
    }

    @action
    handleSetNewPassword = formState => {
        let token = this.inviteEmailPassword ? this.token : this.resetToken
        Accounts.resetPassword(token, formState.values.password, err => {
            if (err) {
                console.log(err)
            } else {
                this.loading = false
                this.showPasswordResetOnly = false
                this.token = null
                this.resetToken = null
                if (this.currentUser.isAdmin) {
                    rootStore.router.push('/dashboard')
                } else {
                    rootStore.router.push('/my-company')
                }
            }
        })
    }

    @action
    setResetToken = token => {
        this.resetToken = token
        if (!isNull(token)) {
            this.showForgotPassword = true
            this.showPasswordResetOnly = true
        } else {
            this.showForgotPassword = false
            this.showPasswordResetOnly = false
        }
    }

    @action
    logout = () => {
        Meteor.logout(() => {
            rootStore.router.push('/login')
            this.setUser(null)
        })
    }

    @action
    setLoggingIn = bool => {
        this.loading = bool
    }
}

const singleton = new AuthStore()

export default singleton
