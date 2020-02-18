import UserStore from './users'

class SubscriptionStore {
    constructor () {
        this.users = new UserStore(this)
    }
}

const singleton = new SubscriptionStore()

export default singleton
