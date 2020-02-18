import { action, computed, observable } from 'mobx'

export default class NotificationStore {
    @observable notification = { open: false }

    @action dispatch = (message, category) => {
        this.notification = { message, category, open: true }
    }

    @action handleClose = () => {
        this.notification = { open: false }
    }

    @computed
    get open () {
        return this.notification.open
    }

    @computed
    get category () {
        return this.notification.category
    }

    @computed
    get message () {
        return this.notification.message
    }
}
