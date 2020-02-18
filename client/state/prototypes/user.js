import isUndefined from 'lodash.isundefined'
import { observable, action, computed } from 'mobx'
import moment from 'moment'

class User {
    constructor (id, user) {
        this._user = user
    }

    @action
    updateState = user => {
        this._user = user
    }

    @observable _user

    @computed
    get id () {
        return this._user._id
    }

    @computed
    get firstName () {
        return this._user.profile.firstName
    }

    @computed
    get lastName () {
        return this._user.profile.lastName
    }

    @computed
    get fullName () {
        return this.firstName + ' ' + this.lastName
    }

    @computed
    get phone () {
        return this._user.profile.phone
    }

    @computed
    get email () {
        return this._user.emails.slice()[0].address
    }

    @computed get role () {
        return this._user.profile.role
    }

    @computed
    get isAdmin () {
        return this.role === 'superAdmin' || this.role === 'admin'
    }

    @computed
    get isCompanyAdmin () {
        return this.role === 'companyAdmin'
    }

    @computed
    get isCompanyUser () {
        return this.role === 'companyUser'
    }

    @computed
    get picture () {
        return this._user.profile.picture
    }

    @computed get companyId () {
        return this._user.profile.company
    }

    @computed
    get active () {
        if (!isUndefined(this._user.profile.active)) {
            return this._user.profile.active
        }
        return true
    }

    @computed get roleDisplay () {
        switch (this.role) {
            case 'admin':
                return 'Admin'
            case 'companyAdmin':
                return 'Company Admin'
            case 'companyUser':
                return 'Company User'
            default:
                return ''
        }
    }

    @computed
    get lastLogin () {
        if (!isUndefined(this._user.profile.lastLogin)) {
            return moment(this._user.profile.lastLogin).fromNow()
        } else {
            return 'Never'
        }
    }
}

export default User
