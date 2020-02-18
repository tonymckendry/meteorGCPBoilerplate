import { observable, action, computed } from 'mobx'
import rootStore from 'state/singletons'

class Company {
    constructor (id, company) {
        this._company = company
    }

    @observable _company

    @computed get id () {
        return this._company._id
    }

    @computed get name () {
        return this._company.name
    }

    @computed get users () {
        return rootStore.users.users.filter(u => {
            return u.companyId === this.id
        })
    }
}

export default Company
