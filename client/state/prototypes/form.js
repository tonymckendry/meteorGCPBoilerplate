import { observable, action, computed } from 'mobx'

class Form {
    constructor (id, form) {
        this._form = form
    }

    @observable _form

    @action updateState = form => (this._form = form)

    @computed
    get id () {
        return this._form._id
    }
}

export default Form
