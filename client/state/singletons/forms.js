import { observable, computed, action } from 'mobx'

class Forms {
    constructor (rootStore) {
        this.rootStore = rootStore
    }

    @observable allForms = []
}

export default Forms
