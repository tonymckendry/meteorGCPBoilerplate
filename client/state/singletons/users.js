import { observable, action, computed } from 'mobx'

class Users {
    constructor (root) {
        this.rootStore = root
    }
    @observable users = []
    @observable selectedId

    @computed
    get filteredUsers () {
        return this.users.filter(u => u.id !== Meteor.userId())
    }

    @computed
    get selectedUser () {
        return this.users.find(user => user.id === this.selectedId) || {}
    }

    @computed
    get allClients () {
        return this.users.filter(u => !u.isAdmin)
    }

    @computed
    get activeClients () {
        return this.users.filter(u => u.active && !u.isAdmin)
    }

    @computed
    get clientTableData () {
        let tableData = []
        let sortedClients = this.allClients.sort((a, b) => {
            if (a.firstName < b.firstName) return -1
            if (a.firstName > b.firstName) return 1
            return 0
        })
        sortedClients.map(client => {
            let clientData = []
            clientData.push(client.id)
            clientData.push(client.firstName)
            clientData.push(client.lastName)
            // this will change to whatever the client status value is later
            clientData.push(client.formIsLocked ? 'Locked' : 'Unlocked')
            clientData.push(client.lastLogin)
            tableData.push(clientData)
        })
        return tableData
    }

    @action setSelectedId = id => {
        this.selectedId = id
    }

    @action
    deactivate = (e, userId, deactivated) => {
        e.stopPropagation()
        Meteor.call('user.deactivate', userId, deactivated, err => {
            if (err) {
                this.rootStore.notifications.dispatch(
                    'There was an error deactivating the user, please try again.',
                    'error'
                )
            } else {
                let status = deactivated ? 'reactivated' : 'deactivated'
                this.rootStore.notifications.dispatch('User successfully ' + status, 'success')
            }
        })

    }

    @action
    insertClient = client => {
        Meteor.call('client.insert', client, err => {
            if (err) {
                this.rootStore.notification.dispatch('Something went wrong', 'error')
            } else {
                this.rootStore.notification.dispatch('New client saved', 'success')
            }
        })
    }

    @action reset = () => {}
}

export default Users
