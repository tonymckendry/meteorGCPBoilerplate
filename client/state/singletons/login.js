import { action } from 'mobx'
import AuthStore from 'state/auth'

export default class LoginStore {
    constructor (rootStore) {
        this.rootStore = rootStore
    }

    @action handleLogin = formState => new Promise((resolve, reject) => {
        const values = formState.values
        Meteor.loginWithPassword(values.email, values.password, (err) => {
            if (err) {
                return reject(err)
            }
            const user = Meteor.user()
            AuthStore.authenticate(user)
                .then(() => AuthStore.authorize(user))
                .then(resolve)
                .catch(error => reject(error))
        })
    })
}
