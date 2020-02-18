import { action } from 'mobx'

export default class LoginStore {
    constructor (rootStore) {
        this.rootStore = rootStore
    }

    @action triggerForgotPassword = formState =>
        new Promise((resolve, reject) => {
            Meteor.call('triggerForgotPassword', formState.values.email, error => {
                if (error) {
                    this.rootStore.notification.dispatch('Something went wrong', 'error')
                    reject(error)
                } else {
                    resolve()
                    this.rootStore.notification.dispatch('Reset password link sent', 'success')
                }
            })
        })

    @action resetPassword = (resetPasswordToken, formState) =>
        new Promise((resolve, reject) => {
            Accounts.resetPassword(resetPasswordToken, formState.values.password, error => {
                if (error) {
                    this.rootStore.notification.dispatch('Something went wrong', 'error')
                    reject(error)
                } else {
                    resolve()
                    this.rootStore.notification.dispatch('Password reset successfully', 'success')
                }
            })
        })
}
